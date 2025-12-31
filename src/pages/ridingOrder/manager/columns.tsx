import type { ProColumns } from "@ant-design/pro-components";
import { Tag, Typography, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { ActionType } from "@ant-design/pro-components";
import Popconfirm from "antd/es/popconfirm";

// 支付状态映射
const hasPaidMap: Record<number, { text: string; color: string }> = {
  0: { text: "未付款", color: "error" },
  1: { text: "已付款", color: "success" },
};

// 支付类型映射
const rechargeTypeMap: Record<number, { text: string; color: string }> = {
  1: { text: "预充值", color: "blue" },
  2: { text: "免密支付", color: "green" },
  3: { text: "超额主动支付", color: "orange" },
};

// 车辆类型映射
const lockTypeMap: Record<number, { text: string; color: string }> = {
  1: { text: "自行车", color: "blue" },
  2: { text: "电动车", color: "green" },
};

interface ColumnsOptions {
  actionRef: React.RefObject<ActionType>;
  onViewDetail: (id: number) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({
  onViewDetail,
  onDelete,
}: ColumnsOptions): ProColumns<API.MemberRidingOrder>[] => [
  {
    title: "ID",
    dataIndex: "id",
    valueType: "digit",
    width: 80,
    hideInSearch: true,
  },
  {
    title: "会员ID",
    dataIndex: "memberId",
    valueType: "digit",
    width: 100,
  },
  {
    title: "手机号",
    dataIndex: "mobile",
    valueType: "text",
    width: 120,
  },
  {
    title: "锁编号",
    dataIndex: "qrNumber",
    valueType: "text",
    width: 120,
  },
  {
    title: "行程ID",
    dataIndex: "tripId",
    valueType: "digit",
    width: 100,
    hideInSearch: true,
  },
  {
    title: "商户订单号",
    dataIndex: "tradeNo",
    valueType: "text",
    width: 180,
    ellipsis: true,
  },
  {
    title: "商户交易单号",
    dataIndex: "transactionId",
    valueType: "text",
    width: 180,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: "支付状态",
    dataIndex: "hasPaid",
    valueType: "select",
    width: 100,
    valueEnum: hasPaidMap,
    fieldProps: {
      options: Object.entries(hasPaidMap).map(([key, value]) => ({
        label: value.text,
        value: Number(key),
      })),
    },
    render: (_, record) => {
      const status = hasPaidMap[record.hasPaid || 0];
      if (status) {
        return <Tag color={status.color}>{status.text}</Tag>;
      }
      return "-";
    },
  },
  {
    title: "支付类型",
    dataIndex: "rechargeType",
    valueType: "select",
    width: 120,
    valueEnum: rechargeTypeMap,
    fieldProps: {
      options: Object.entries(rechargeTypeMap).map(([key, value]) => ({
        label: value.text,
        value: Number(key),
      })),
    },
    render: (_, record) => {
      const type = rechargeTypeMap[record.rechargeType || 0];
      if (type) {
        return <Tag color={type.color}>{type.text}</Tag>;
      }
      return "-";
    },
  },
  {
    title: "车辆类型",
    dataIndex: "lockType",
    valueType: "select",
    width: 100,
    valueEnum: lockTypeMap,
    fieldProps: {
      options: Object.entries(lockTypeMap).map(([key, value]) => ({
        label: value.text,
        value: Number(key),
      })),
    },
    render: (_, record) => {
      const type = lockTypeMap[record.lockType || 0];
      if (type) {
        return <Tag color={type.color}>{type.text}</Tag>;
      }
      return "-";
    },
  },
  {
    title: "运营商",
    dataIndex: "distributor",
    valueType: "text",
    width: 120,
    hideInSearch: true,
  },
  {
    title: "预充值金额",
    dataIndex: "preMoney",
    valueType: "money",
    width: 100,
    hideInSearch: true,
    render: (_, record) => (
      <Typography.Text type="success">¥{record.preMoney}</Typography.Text>
    ),
  },
  {
    title: "消费金额",
    dataIndex: "costAmount",
    valueType: "money",
    width: 100,
    hideInSearch: true,
    render: (_, record) => (
      <Typography.Text type="warning">¥{record.costAmount}</Typography.Text>
    ),
  },
  {
    title: "需支付金额",
    dataIndex: "needAmount",
    valueType: "money",
    width: 100,
    hideInSearch: true,
    render: (_, record) => (
      <Typography.Text type="danger">¥{record.needAmount}</Typography.Text>
    ),
  },
  {
    title: "骑行时长",
    dataIndex: "tripTimespan",
    valueType: "digit",
    width: 100,
    hideInSearch: true,
    render: (_, record) => {
      const timespan = record.tripTimespan || 0;
      const minutes = Math.floor(timespan / 60);
      const seconds = timespan % 60;
      return `${minutes}分${seconds}秒`;
    },
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    valueType: "dateTime",
    width: 180,
    hideInSearch: true,
  },
  {
    title: "结束时间",
    dataIndex: "endTime",
    valueType: "dateTime",
    width: 180,
    hideInSearch: true,
  },
  {
    title: "添加时间",
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
    title: "备注",
    dataIndex: "remark",
    valueType: "text",
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    width: 120,
    fixed: "right",
    render: (_, record) => [
      <Space key={record.id} wrap>
        <Typography.Link
          onClick={() => {
            onViewDetail(record.id as number);
          }}
        >
          <EyeOutlined /> 详情
        </Typography.Link>
        <Popconfirm
          title="确定删除吗？"
          onConfirm={() => {
            if (record?.id) {
              onDelete(record.id);
            }
          }}
        >
          <Typography.Link type="danger">删除</Typography.Link>
        </Popconfirm>
      </Space>,
    ],
  },
];

export { hasPaidMap, rechargeTypeMap, lockTypeMap };