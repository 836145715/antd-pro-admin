import type { ProColumns } from "@ant-design/pro-components";
import { Tag, Typography, Space } from "antd";
import Popconfirm from "antd/es/popconfirm";

// 命令类型映射
const commandTypeMap: Record<number, { text: string; color: string }> = {
  1: { text: "开锁", color: "green" },
  2: { text: "关锁", color: "red" },
  3: { text: "重启", color: "orange" },
  4: { text: "升级", color: "blue" },
  5: { text: "IP设置", color: "purple" },
  6: { text: "定位信息获取", color: "cyan" },
  7: { text: "找车", color: "gold" },
};

// 车类型映射
const bicycleTypeMap: Record<number, { text: string; color: string }> = {
  1: { text: "自行车", color: "blue" },
  2: { text: "电动车", color: "green" },
  3: { text: "蓝牙车", color: "orange" },
};

interface ColumnsOptions {
  onEdit: (record: API.TripCommand) => void;
  onDelete: (id: number) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: ColumnsOptions): ProColumns<API.TripCommand>[] => [
  {
    title: "ID",
    dataIndex: "id",
    valueType: "digit",
    hideInForm: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: "用户ID",
    dataIndex: "memberId",
    valueType: "digit",
    width: 100,
    hideInSearch: true,
  },
  {
    title: "锁编号",
    dataIndex: "qrNumber",
    valueType: "text",
    width: 140,
    formItemProps: {
      rules: [{ required: true, message: "请输入锁编号" }],
    },
  },
  {
    title: "锁IMEI",
    dataIndex: "imei",
    valueType: "text",
    width: 150,
    formItemProps: {
      rules: [{ required: true, message: "请输入锁IMEI" }],
    },
  },
  {
    title: "命令类型",
    dataIndex: "type",
    valueType: "select",
    width: 120,
    valueEnum: commandTypeMap,
    fieldProps: {
      options: Object.entries(commandTypeMap).map(([key, value]) => ({
        label: value.text,
        value: Number(key),
      })),
    },
    render: (_, record) => {
      const type = commandTypeMap[record.type || 0];
      if (type) {
        return <Tag color={type.color}>{type.text}</Tag>;
      }
      return "-";
    },
  },
  {
    title: "车类型",
    dataIndex: "bicycleType",
    valueType: "select",
    width: 100,
    valueEnum: bicycleTypeMap,
    fieldProps: {
      options: Object.entries(bicycleTypeMap).map(([key, value]) => ({
        label: value.text,
        value: Number(key),
      })),
    },
    render: (_, record) => {
      const type = bicycleTypeMap[record.bicycleType || 0];
      if (type) {
        return <Tag color={type.color}>{type.text}</Tag>;
      }
      return "-";
    },
  },
  {
    title: "是否处理",
    dataIndex: "hasExecuted",
    valueType: "select",
    width: 100,
    valueEnum: {
      0: { text: "未处理", status: "error" },
      1: { text: "已处理", status: "success" },
    },
    render: (_, record) => (
      <Tag color={record.hasExecuted === 1 ? "green" : "red"}>
        {record.hasExecuted === 1 ? "已处理" : "未处理"}
      </Tag>
    ),
  },
  {
    title: "处理时间",
    dataIndex: "executeTime",
    valueType: "dateTime",
    width: 180,
    hideInSearch: true,
  },
  {
    title: "参数类型",
    dataIndex: "paramType",
    valueType: "select",
    width: 150,
    hideInSearch: true,
    valueEnum: {
      0: { text: "IP" },
      1: { text: "域名" },
      2: { text: "设置开锁成功语音" },
      3: { text: "设置开锁失败语音" },
      4: { text: "设置关锁成功语音" },
      5: { text: "设置关锁失败语音" },
      6: { text: "设置震动报警语音" },
    },
  },
  {
    title: "参数",
    dataIndex: "param",
    valueType: "text",
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: "端口",
    dataIndex: "port",
    valueType: "digit",
    width: 100,
    hideInSearch: true,
  },
  {
    title: "定位时间",
    dataIndex: "time",
    valueType: "digit",
    width: 100,
    hideInSearch: true,
  },
  {
    title: "定位模式",
    dataIndex: "mode",
    valueType: "select",
    width: 120,
    hideInSearch: true,
    valueEnum: {
      0: { text: "激活时间内" },
      1: { text: "一直激活" },
    },
    render: (_, record) => (
      <Tag color={record.mode === 1 ? "blue" : "default"}>
        {record.mode === 1 ? "一直激活" : "激活时间内"}
      </Tag>
    ),
  },
  {
    title: "管理员开锁",
    dataIndex: "isMaintain",
    valueType: "select",
    width: 100,
    hideInSearch: true,
    valueEnum: {
      1: { text: "是" },
      2: { text: "否" },
    },
    render: (_, record) => (
      <Tag color={record.isMaintain === 1 ? "green" : "default"}>
        {record.isMaintain === 1 ? "是" : "否"}
      </Tag>
    ),
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
    width: 150,
    fixed: "right",
    render: (_, record) => [
      <Space key={record.id} wrap>
        <Typography.Link
          onClick={() => {
            onEdit(record);
          }}
        >
          修改
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

export { commandTypeMap, bicycleTypeMap };
