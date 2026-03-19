import { memberCouponPage } from "@/api/memberCouponController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useRef } from "react";

/**
 * 用户优惠券管理页面（只读）
 */
export default function MemberCouponManage() {
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<API.MemberCoupon>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      width: 80,
      hideInSearch: true,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: 140,
      copyable: true,
    },
    {
      title: "优惠券名称",
      dataIndex: "couponName",
      width: 160,
      hideInSearch: true,
    },
    {
      title: "优惠券类型",
      dataIndex: "couponType",
      valueType: "select",
      width: 120,
      hideInSearch: true,
      valueEnum: {
        "1": { text: "抵扣时长券" },
        "2": { text: "时长卡" },
      },
    },
    {
      title: "价格(元)",
      dataIndex: "couponPrice",
      valueType: "money",
      width: 100,
      hideInSearch: true,
    },
    {
      title: "抵扣时长(分钟)",
      dataIndex: "freeDuration",
      valueType: "digit",
      width: 130,
      hideInSearch: true,
    },
    {
      title: "有效时长(天)",
      dataIndex: "effectiveDuration",
      valueType: "digit",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      width: 80,
      valueEnum: {
        0: { text: "失效", status: "default" },
        1: { text: "有效", status: "success" },
      },
      render: (_, record) => (
        <Tag color={record.status === 1 ? "green" : "default"}>
          {record.status === 1 ? "有效" : "失效"}
        </Tag>
      ),
    },
    {
      title: "运营商",
      dataIndex: "distributorName",
      width: 140,
      hideInSearch: true,
    },
    {
      title: "运营商ID",
      dataIndex: "distributorId",
      valueType: "digit",
      width: 100,
      hideInTable: true,
    },
    {
      title: "交易号",
      dataIndex: "tradeNo",
      width: 200,
      hideInSearch: true,
      copyable: true,
    },
    {
      title: "购买时间",
      dataIndex: "insertTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Title level={3}>用户优惠券</Title>
      <ProTable<API.MemberCoupon>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await memberCouponPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            memberId: params.memberId,
            status: params.status,
            distributorId: params.distributorId,
            mobile: params.mobile,
          });
          if (res.data) {
            return {
              data: res.data.list || [],
              success: true,
              total: Number(res.data.total) || 0,
            };
          }
          return { data: [], success: false, total: 0 };
        }}
        pagination={{ defaultPageSize: 10, showSizeChanger: true }}
        search={{ labelWidth: "auto" }}
        dateFormatter="string"
        headerTitle="用户优惠券"
        scroll={{ x: 1200 }}
      />
    </>
  );
}
