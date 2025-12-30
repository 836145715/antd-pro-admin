import {
  tripDel,
  tripPage,
  tripGet,
} from "@/api/tripController";
import { ReloadOutlined } from "@ant-design/icons";
import type { ActionType } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message } from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import TripDetailModal from "./TripDetailModal";
import { createColumns } from "./columns";

/**
 * 行程管理页面
 */
export default function TripManager() {
  const actionRef = useRef<ActionType>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<API.Trip>();

  const handleDelete = (id: number) => {
    tripDel({ id })
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
      const res = await tripGet({ id });
      if (res.success && res.data) {
        setCurrentTrip(res.data);
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
      <Title level={3}>行程管理</Title>
      <ProTable<API.Trip>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        scroll={{ x: 1200 }}
        request={async (params) => {
          const res = await tripPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            qrNumber: params.qrNumber,
            mobile: params.mobile,
            memberId: params.memberId,
            tripStatus: params.tripStatus,
            bicycleType: params.bicycleType,
            deviceId: params.deviceId,
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
          persistenceKey: "pro-table-trip-manager",
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
        headerTitle="行程管理"
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
      <TripDetailModal
        open={detailModalOpen}
        trip={currentTrip}
        onClose={() => {
          setDetailModalOpen(false);
          setCurrentTrip(undefined);
        }}
      />
    </>
  );
}
