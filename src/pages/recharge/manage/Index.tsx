import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useRef } from "react";
import request from "@/utils/request";

/**
 * 分页查询交易记录（直接调用，等 npm run gen 生成后可替换）
 */
async function rechargePage(body: any) {
  return request<any>("/recharge/manage/page", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: body,
  });
}

/** 充值类型映射 */
const rechargeTypeMap: Record<number, string> = {
  1: "余额充值",
  2: "余额退款",
  3: "预付充值",
  4: "预付退款",
  5: "购买优惠券",
  6: "优惠券退款",
  7: "骑行支付",
  8: "骑行退款",
  9: "信用分支付",
  10: "信用分退款",
  11: "免密支付",
  12: "免密退款",
};

/** 支付状态映射 */
const payStatusMap: Record<number, { text: string; color: string }> = {
  0: { text: "未支付", color: "default" },
  1: { text: "已支付", color: "green" },
  2: { text: "已退款", color: "orange" },
  3: { text: "部分退款", color: "blue" },
  4: { text: "已取消", color: "red" },
};

/**
 * 交易管理页面
 */
export default function RechargeManage() {
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<any>[] = [
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
      title: "金额",
      dataIndex: "amount",
      valueType: "money",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "充值类型",
      dataIndex: "rechargeType",
      valueType: "select",
      width: 120,
      valueEnum: Object.fromEntries(
        Object.entries(rechargeTypeMap).map(([k, v]) => [k, { text: v }])
      ),
      render: (_, record) => rechargeTypeMap[record.rechargeType] || "-",
    },
    {
      title: "支付状态",
      dataIndex: "payStatus",
      valueType: "select",
      width: 100,
      valueEnum: Object.fromEntries(
        Object.entries(payStatusMap).map(([k, v]) => [k, { text: v.text }])
      ),
      render: (_, record) => {
        const item = payStatusMap[record.payStatus];
        return item ? <Tag color={item.color}>{item.text}</Tag> : "-";
      },
    },
    {
      title: "商户单号",
      dataIndex: "tradeNo",
      width: 200,
      copyable: true,
    },
    {
      title: "微信订单号",
      dataIndex: "wxTradeNo",
      width: 200,
      hideInSearch: true,
      copyable: true,
    },
    {
      title: "支付渠道",
      dataIndex: "payChannel",
      valueType: "select",
      width: 100,
      valueEnum: {
        1: { text: "银联" },
        2: { text: "易宝" },
      },
      render: (_, record) => {
        const m: Record<number, string> = { 1: "银联", 2: "易宝" };
        return m[record.payChannel] || "-";
      },
    },
    {
      title: "用户平台",
      dataIndex: "userPlatform",
      valueType: "select",
      width: 100,
      valueEnum: {
        1: { text: "微信" },
        2: { text: "支付宝" },
      },
      render: (_, record) => {
        const m: Record<number, string> = { 1: "微信", 2: "支付宝" };
        return m[record.userPlatform] || "-";
      },
    },
    {
      title: "车锁编号",
      dataIndex: "bicycleNumber",
      width: 120,
      hideInSearch: true,
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
      title: "备注",
      dataIndex: "remark",
      width: 160,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "交易时间",
      dataIndex: "insertTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
    },
    {
      title: "通知时间",
      dataIndex: "notifyTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
    },
    {
      title: "开始日期",
      dataIndex: "startDate",
      valueType: "date",
      hideInTable: true,
    },
    {
      title: "结束日期",
      dataIndex: "endDate",
      valueType: "date",
      hideInTable: true,
    },
  ];

  return (
    <>
      <Title level={3}>交易管理</Title>
      <ProTable<any>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await rechargePage({
            pageNum: params.current,
            pageSize: params.pageSize,
            mobile: params.mobile,
            tradeNo: params.tradeNo,
            rechargeType: params.rechargeType,
            payStatus: params.payStatus,
            payChannel: params.payChannel,
            userPlatform: params.userPlatform,
            distributorId: params.distributorId,
            startDate: params.startDate,
            endDate: params.endDate,
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
        headerTitle="交易管理"
        scroll={{ x: 1600 }}
      />
    </>
  );
}
