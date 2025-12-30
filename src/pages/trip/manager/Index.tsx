import {
  tripDel,
  tripPage,
  tripGet,
} from "@/api/tripController";
import {
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Tag,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import TripDetailModal from "./TripDetailModal";

/**
 * 行程管理页面
 */
export default function TripManager() {
  const actionRef = useRef<ActionType>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<API.Trip>();

  // 车类型映射
  const bicycleTypeMap: Record<number, { text: string; color: string }> = {
    1: { text: "自行车", color: "blue" },
    2: { text: "电动车", color: "green" },
    3: { text: "蓝牙车", color: "orange" },
  };

  // 骑行状态映射
  const tripStatusMap: Record<number, { text: string; color: string }> = {
    1: { text: "进行中", color: "processing" },
    2: { text: "已结束", color: "success" },
  };

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

  const columns: ProColumns<API.Trip>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      width: 80,
      hideInSearch: true,
    },
    {
      title: "自行车编号",
      dataIndex: "qrNumber",
      valueType: "text",
      width: 140,
    },
    {
      title: "设备ID",
      dataIndex: "deviceId",
      valueType: "digit",
      width: 100,
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
      title: "用户手机号",
      dataIndex: "mobile",
      valueType: "text",
      width: 120,
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
      title: "运营商",
      dataIndex: "distributorName",
      valueType: "text",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "骑行状态",
      dataIndex: "tripStatus",
      valueType: "select",
      width: 100,
      valueEnum: tripStatusMap,
      render: (_, record) => {
        const status = tripStatusMap[record.tripStatus || 0];
        if (status) {
          return <Tag color={status.color}>{status.text}</Tag>;
        }
        return "-";
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
      title: "骑行费用",
      dataIndex: "tripFee",
      valueType: "money",
      width: 100,
      hideInSearch: true,
      render: (_, record) => (
        <Typography.Text type="success">
          ¥{record.tripFee ? (record.tripFee / 100).toFixed(2) : "0.00"}
        </Typography.Text>
      ),
    },
    {
      title: "调度费",
      dataIndex: "dispatchingFee",
      valueType: "money",
      width: 100,
      hideInSearch: true,
      render: (_, record) => (
        <Typography.Text type="warning">
          ¥{record.dispatchingFee ? (record.dispatchingFee / 100).toFixed(2) : "0.00"}
        </Typography.Text>
      ),
    },
    {
      title: "强制结束",
      dataIndex: "isCoercion",
      valueType: "select",
      width: 100,
      hideInSearch: true,
      valueEnum: {
        0: { text: "否" },
        1: { text: "是" },
      },
      render: (_, record) => (
        <Tag color={record.isCoercion === 1 ? "red" : "green"}>
          {record.isCoercion === 1 ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "开锁地址",
      dataIndex: "openAddress",
      valueType: "text",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "关锁地址",
      dataIndex: "lockAddress",
      valueType: "text",
      width: 200,
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
              handleViewDetail(record.id as number);
            }}
          >
            <EyeOutlined /> 详情
          </Typography.Link>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => {
              if (record?.id) {
                handleDelete(record.id);
              }
            }}
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>,
      ],
    },
  ];

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
