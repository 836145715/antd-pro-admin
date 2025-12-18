import {
  deviceDel,
  devicePage,
  deviceAdd,
  deviceUpdate,
  deviceGetLocation,
  deviceUpdateStatus,
} from "@/api/lockDeviceController";
import {
  PlusOutlined,
  EnvironmentOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Typography,
  Tag,
  Modal,
  Descriptions,
  QRCode,
} from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";

/**
 * 设备管理页面
 */
export default function DeviceManager() {
  const actionRef = useRef<ActionType>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.LockDevice>();
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  const onCreateSubmit = () => {
    setCreateModalOpen(false);
    actionRef.current?.reload();
  };

  const onEditSubmit = () => {
    setEditModalOpen(false);
    actionRef.current?.reload();
  };

  const handleDelete = (id: number) => {
    deviceDel({ id })
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

  const handleGetLocation = async (imei: string) => {
    try {
      const res = await deviceGetLocation({ imei });
      if (res.success && res.data) {
        setDeviceLocation({
          longitude: res.data.longitude || 0,
          latitude: res.data.latitude || 0,
        });
        setLocationModalOpen(true);
      } else {
        message.error("获取位置失败: " + res.message);
      }
    } catch (error: any) {
      message.error("获取位置失败: " + error.message);
    }
  };

  const handleUpdateStatus = async (id: number, status: number) => {
    try {
      const res = await deviceUpdateStatus({ id, status });
      if (res.success) {
        message.success("状态更新成功");
        actionRef.current?.reload();
      } else {
        message.error("状态更新失败: " + res.message);
      }
    } catch (error: any) {
      message.error("状态更新失败: " + error.message);
    }
  };

  const columns: ProColumns<API.LockDevice>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      hideInForm: true,
      fixed: "left",
      width: 80,
      hideInSearch: true,
    },
    {
      title: "IMEI号",
      dataIndex: "imei",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true, message: "请输入IMEI号" }],
      },
      width: 150,
      copyable: true,
    },
    {
      title: "SIM卡号",
      dataIndex: "sim",
      valueType: "text",
      width: 150,
      hideInSearch: true,
    },
    {
      title: "锁编号",
      dataIndex: "qrNumber",
      valueType: "text",
      width: 120,
      hideInSearch: true,
      render: (_, record) => {
        if (!record.qrNumber) return "-";
        const url = `https://ahzmwl.ahzmwl.com/jiameng/bycx?qr_number=${record.qrNumber}`;
        return (
          <Typography.Link
            onClick={(e) => {
              e.preventDefault();
              // 生成二维码
              Modal.info({
                icon: null,
                width: 280,
                centered: true,
                content: (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <Typography.Text strong>
                        锁编号: {record.qrNumber}
                      </Typography.Text>
                      <QRCode className="my-4" value={url} />
                    </div>
                  </>
                ),
                okText: "关闭",
                okButtonProps: { style: { width: "100%" } },
              });
            }}
          >
            {record.qrNumber}
          </Typography.Link>
        );
      },
    },
    {
      title: "运营商",
      dataIndex: "distributorName",
      valueType: "text",
      width: 120,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: "车辆类型",
      dataIndex: "bicycleType",
      valueType: "select",
      width: 120,
      valueEnum: {
        1: { text: "自行车" },
        2: { text: "电动车" },
        3: { text: "蓝牙车" },
      },
      fieldProps: {
        options: [
          { label: "自行车", value: 1 },
          { label: "电动车", value: 2 },
          { label: "蓝牙车", value: 3 },
        ],
      },
    },
    {
      title: "设备状态",
      dataIndex: "status",
      valueType: "select",
      width: 100,
      hideInSearch: true,
      valueEnum: {
        1: { text: "开锁", status: "success" },
        2: { text: "关锁", status: "default" },
      },
      render: (_, record) => (
        <Tag color={record.status === 1 ? "green" : "default"}>
          {record.status === 1 ? "开锁" : "关锁"}
        </Tag>
      ),
    },
    {
      title: "锁状态",
      dataIndex: "lockStatus",
      valueType: "select",
      width: 100,
      hideInSearch: true,
      valueEnum: {
        0: { text: "离线", status: "error" },
        1: { text: "在线", status: "success" },
      },
      render: (_, record) => (
        <Tag color={record.lockStatus === 1 ? "green" : "red"}>
          {record.lockStatus === 1 ? "在线" : "离线"}
        </Tag>
      ),
    },
    {
      title: "电量",
      dataIndex: "mainElectricity",
      valueType: "digit",
      width: 100,
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        const electricity = record.mainElectricity || 0;
        let color = "green";
        if (electricity < 20) color = "red";
        else if (electricity < 50) color = "orange";
        return <Tag color={color}>{electricity}%</Tag>;
      },
    },
    {
      title: "定位模式",
      dataIndex: "positionMode",
      valueType: "select",
      width: 120,
      hideInSearch: true,
      valueEnum: {
        1: { text: "基站定位" },
        2: { text: "GPS定位" },
        3: { text: "手机定位" },
      },
      fieldProps: {
        options: [
          { label: "基站定位", value: 1 },
          { label: "GPS定位", value: 2 },
          { label: "手机定位", value: 3 },
        ],
      },
    },
    {
      title: "经度",
      dataIndex: "longitude",
      valueType: "digit",
      width: 120,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "纬度",
      dataIndex: "latitude",
      valueType: "digit",
      width: 120,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "最后开锁时间",
      dataIndex: "latestUnlockTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "最后关锁时间",
      dataIndex: "latestLockTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "最后在线时间",
      dataIndex: "onlineUpdateTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "硬件版本",
      dataIndex: "contractVersion",
      valueType: "text",
      width: 120,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 300,
      fixed: "right",
      render: (_, record) => [
        <Space key={record.id} wrap>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setEditModalOpen(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              if (record.imei) {
                handleGetLocation(record.imei);
              }
            }}
          >
            <EnvironmentOutlined /> 位置
          </Typography.Link>
          {record.status === 2 ? (
            <Typography.Link
              onClick={() => {
                if (record.id) {
                  handleUpdateStatus(record.id, 1);
                }
              }}
            >
              <UnlockOutlined /> 开锁
            </Typography.Link>
          ) : (
            <Typography.Link
              onClick={() => {
                if (record.id) {
                  handleUpdateStatus(record.id, 2);
                }
              }}
            >
              <LockOutlined /> 关锁
            </Typography.Link>
          )}
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
      <Title level={3}>设备管理</Title>
      <ProTable<API.LockDevice>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await devicePage({
            pageNum: params.current,
            pageSize: params.pageSize,
            imei: params.imei,
            qrNumber: params.qrNumber,
            distributorId: params.distributorId,
            bicycleType: params.bicycleType,
            status: params.status,
            lockStatus: params.lockStatus,
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
          persistenceKey: "pro-table-device-manage",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
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
        headerTitle="设备管理"
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateFormModal<API.LockDevice>
        visible={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSubmit={onCreateSubmit}
        columns={columns}
        title="创建设备"
        createApi={deviceAdd}
        successMessage="创建成功"
        loadingMessage="创建中..."
        errorMessage="创建失败"
      />

      <EditFormModal<API.LockDevice>
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSubmit={onEditSubmit}
        columns={columns}
        initialValues={currentRow}
        title="更新设备"
        updateApi={deviceUpdate}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />

      {/* 位置信息弹窗 */}
      <Modal
        title="设备位置信息"
        open={locationModalOpen}
        onCancel={() => setLocationModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setLocationModalOpen(false)}>
            关闭
          </Button>,
        ]}
        width={500}
      >
        {deviceLocation && (
          <Descriptions column={1}>
            <Descriptions.Item label="经度">
              {deviceLocation.longitude}
            </Descriptions.Item>
            <Descriptions.Item label="纬度">
              {deviceLocation.latitude}
            </Descriptions.Item>
            <Descriptions.Item label="地图链接">
              <Typography.Link
                href={`https://www.google.com/maps?q=${deviceLocation.latitude},${deviceLocation.longitude}`}
                target="_blank"
              >
                在地图中查看
              </Typography.Link>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
