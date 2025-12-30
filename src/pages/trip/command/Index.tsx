import {
  tripCommandDel,
  tripCommandPage,
  tripCommandSave,
  tripCommandUpdate,
} from "@/api/tripCommandController";
import {
  PlusOutlined,
  ReloadOutlined,
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
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";

/**
 * 行程命令管理页面
 */
export default function TripCommand() {
  const actionRef = useRef<ActionType>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.TripCommand>();
  const [form] = Form.useForm();

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

  // 参数类型映射
  const paramTypeMap: Record<number, string> = {
    0: "IP",
    1: "域名",
    2: "设置开锁成功语音",
    3: "设置开锁失败语音",
    4: "设置关锁成功语音",
    5: "设置关锁失败语音",
    6: "设置震动报警语音",
  };

  const onCreateSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await tripCommandSave(values);
      if (res.success) {
        message.success("创建成功");
        setCreateModalOpen(false);
        form.resetFields();
        actionRef.current?.reload();
      } else {
        message.error("创建失败: " + res.message);
      }
    } catch (error: any) {
      if (error.errorFields) return;
      message.error("创建失败: " + error.message);
    }
  };

  const onEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await tripCommandUpdate({
        ...values,
        id: currentRow?.id,
      });
      if (res.success) {
        message.success("更新成功");
        setEditModalOpen(false);
        actionRef.current?.reload();
      } else {
        message.error("更新失败: " + res.message);
      }
    } catch (error: any) {
      if (error.errorFields) return;
      message.error("更新失败: " + error.message);
    }
  };

  const handleDelete = (id: number) => {
    tripCommandDel({ id })
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

  const columns: ProColumns<API.TripCommand>[] = [
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
      valueEnum: paramTypeMap,
      fieldProps: {
        options: Object.entries(paramTypeMap).map(([key, value]) => ({
          label: value,
          value: Number(key),
        })),
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
              setCurrentRow(record);
              setEditModalOpen(true);
            }}
          >
            修改
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
      <Title level={3}>行程命令管理</Title>
      <ProTable<API.TripCommand>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await tripCommandPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            qrNumber: params.qrNumber,
            imei: params.imei,
            type: params.type,
            bicycleType: params.bicycleType,
            hasExecuted: params.hasExecuted,
            memberId: params.memberId,
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
          persistenceKey: "pro-table-trip-command",
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
        headerTitle="行程命令管理"
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

      {/* 新建弹窗 */}
      <Modal
        title="新增行程命令"
        open={createModalOpen}
        onCancel={() => {
          setCreateModalOpen(false);
          form.resetFields();
        }}
        onOk={onCreateSubmit}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="qrNumber"
            label="锁编号"
            rules={[{ required: true, message: "请输入锁编号" }]}
          >
            <Input placeholder="请输入锁编号" />
          </Form.Item>
          <Form.Item
            name="imei"
            label="锁IMEI"
            rules={[{ required: true, message: "请输入锁IMEI" }]}
          >
            <Input placeholder="请输入锁IMEI" />
          </Form.Item>
          <Form.Item
            name="type"
            label="命令类型"
            rules={[{ required: true, message: "请选择命令类型" }]}
          >
            <Select
              placeholder="请选择命令类型"
              options={Object.entries(commandTypeMap).map(([key, value]) => ({
                label: value.text,
                value: Number(key),
              }))}
            />
          </Form.Item>
          <Form.Item name="bicycleType" label="车类型">
            <Select
              placeholder="请选择车类型"
              options={Object.entries(bicycleTypeMap).map(([key, value]) => ({
                label: value.text,
                value: Number(key),
              }))}
            />
          </Form.Item>
          <Form.Item name="paramType" label="参数类型">
            <Select
              placeholder="请选择参数类型"
              options={Object.entries(paramTypeMap).map(([key, value]) => ({
                label: value,
                value: Number(key),
              }))}
              allowClear
            />
          </Form.Item>
          <Form.Item name="param" label="参数">
            <Input placeholder="请输入参数" />
          </Form.Item>
          <Form.Item name="port" label="端口">
            <InputNumber placeholder="请输入端口" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="time" label="定位时间">
            <InputNumber placeholder="请输入定位时间" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="mode" label="定位模式">
            <Select
              placeholder="请选择定位模式"
              options={[
                { label: "激活时间内", value: 0 },
                { label: "一直激活", value: 1 },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item name="isMaintain" label="管理员开锁">
            <Select
              placeholder="是否为管理员开锁"
              options={[
                { label: "是", value: 1 },
                { label: "否", value: 2 },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item name="memberId" label="用户ID">
            <InputNumber placeholder="请输入用户ID" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑弹窗 */}
      <Modal
        title="修改行程命令"
        open={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          setCurrentRow(undefined);
        }}
        onOk={onEditSubmit}
        width={600}
      >
        <Form form={form} layout="vertical" initialValues={currentRow}>
          <Form.Item
            name="qrNumber"
            label="锁编号"
            rules={[{ required: true, message: "请输入锁编号" }]}
          >
            <Input placeholder="请输入锁编号" />
          </Form.Item>
          <Form.Item
            name="imei"
            label="锁IMEI"
            rules={[{ required: true, message: "请输入锁IMEI" }]}
          >
            <Input placeholder="请输入锁IMEI" />
          </Form.Item>
          <Form.Item
            name="type"
            label="命令类型"
            rules={[{ required: true, message: "请选择命令类型" }]}
          >
            <Select
              placeholder="请选择命令类型"
              options={Object.entries(commandTypeMap).map(([key, value]) => ({
                label: value.text,
                value: Number(key),
              }))}
            />
          </Form.Item>
          <Form.Item name="bicycleType" label="车类型">
            <Select
              placeholder="请选择车类型"
              options={Object.entries(bicycleTypeMap).map(([key, value]) => ({
                label: value.text,
                value: Number(key),
              }))}
            />
          </Form.Item>
          <Form.Item name="paramType" label="参数类型">
            <Select
              placeholder="请选择参数类型"
              options={Object.entries(paramTypeMap).map(([key, value]) => ({
                label: value,
                value: Number(key),
              }))}
              allowClear
            />
          </Form.Item>
          <Form.Item name="param" label="参数">
            <Input placeholder="请输入参数" />
          </Form.Item>
          <Form.Item name="port" label="端口">
            <InputNumber placeholder="请输入端口" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="time" label="定位时间">
            <InputNumber placeholder="请输入定位时间" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="mode" label="定位模式">
            <Select
              placeholder="请选择定位模式"
              options={[
                { label: "激活时间内", value: 0 },
                { label: "一直激活", value: 1 },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item name="isMaintain" label="管理员开锁">
            <Select
              placeholder="是否为管理员开锁"
              options={[
                { label: "是", value: 1 },
                { label: "否", value: 2 },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item name="memberId" label="用户ID">
            <InputNumber placeholder="请输入用户ID" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={3} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
