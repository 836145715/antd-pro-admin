import {
  ridingOrderDel,
  ridingOrderPage,
  ridingOrderGet,
} from "@/api/memberRidingOrderController";
import { ReloadOutlined } from "@ant-design/icons";
import type { ActionType } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message } from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import RidingOrderDetailModal from "./RidingOrderDetailModal";
import { createColumns } from "./columns";

/**
 * 行程订单管理页面
 */
export default function RidingOrderManager() {
  const actionRef = useRef<ActionType>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<API.MemberRidingOrder>();

  const handleDelete = (id: number) => {
    ridingOrderDel({ id })
      .then((res: any) => {
        if (res.success) {
          message.success("删除成功");
          actionRef.current?.reload();
        } else {
          message.error("删除失败: " + res.message);
        }
      })
      .catch((error: any) => {
        message.error("删除失败: " + error.message);
      });
  };

  const handleViewDetail = async (id: number) => {
    try {
      const res = await ridingOrderGet({ id });
      if (res.success && res.data) {
        setCurrentOrder(res.data);
        setDetailModalOpen(true);
      } else {
        message.error("获取详情失败: " + res.message);
      }
    } catch (error: any) {
      message.error("获取详情失败: " + error.message);
    }
  };

  const columns = createColumns({
    actionRef,
    onViewDetail: handleViewDetail,
    onDelete: handleDelete,
  });

  return (
    <>
      <Title level={3}>行程订单管理</Title>
      <ProTable<API.MemberRidingOrder>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        scroll={{ x: 1200 }}
        request={async (params) => {
          const res = await ridingOrderPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            memberId: params.memberId,
            hasPaid: params.hasPaid,
            rechargeType: params.rechargeType,
            distributorId: params.distributorId,
            qrNumber: params.qrNumber,
            tripId: params.tripId,
            mobile: params.mobile,
            tradeNo: params.tradeNo,
            transactionId: params.transactionId,
            lockType: params.lockType,
            insertTimeStart: params.insertTimeStart
              ? dayjs(params.insertTimeStart).format("YYYY-MM-DD HH:mm:ss")
              : undefined,
            insertTimeEnd: params.insertTimeEnd
              ? dayjs(params.insertTimeEnd).format("YYYY-MM-DD HH:mm:ss")
              : undefined,
            startTimeStart: params.startTimeStart
              ? dayjs(params.startTimeStart).format("YYYY-MM-DD HH:mm:ss")
              : undefined,
            startTimeEnd: params.startTimeEnd
              ? dayjs(params.startTimeEnd).format("YYYY-MM-DD HH:mm:ss")
              : undefined,
          });

          if (res.data) {
            return {
              data: res.data.list || [],
              success: true,
              total: Number(res.data.total) || 0,
            };
          }
          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        columnsState={{
          persistenceKey: "pro-table-riding-order-manager",
          persistenceType: "localStorage",
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="行程订单管理"
        toolBarRender={() => [
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
          >
            刷新
          </Button>,
        ]}
      />

      {/* 详情弹窗 */}
      <RidingOrderDetailModal
        open={detailModalOpen}
        order={currentOrder}
        onClose={() => {
          setDetailModalOpen(false);
          setCurrentOrder(undefined);
        }}
      />
    </>
  );
}