import { Form, Input, InputNumber, Modal, Select } from "antd";
import type { FormInstance } from "antd/es/form";

interface EditModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  form: FormInstance;
  initialValues?: API.TripCommand;
}

const commandTypeMap: Record<number, { text: string; color: string }> = {
  1: { text: "开锁", color: "green" },
  2: { text: "关锁", color: "red" },
  3: { text: "重启", color: "orange" },
  4: { text: "升级", color: "blue" },
  5: { text: "IP设置", color: "purple" },
  6: { text: "定位信息获取", color: "cyan" },
  7: { text: "找车", color: "gold" },
};

const bicycleTypeMap: Record<number, { text: string; color: string }> = {
  1: { text: "自行车", color: "blue" },
  2: { text: "电动车", color: "green" },
  3: { text: "蓝牙车", color: "orange" },
};

const paramTypeMap: Record<number, string> = {
  0: "IP",
  1: "域名",
  2: "设置开锁成功语音",
  3: "设置开锁失败语音",
  4: "设置关锁成功语音",
  5: "设置关锁失败语音",
  6: "设置震动报警语音",
};

export default function EditModal({
  open,
  onCancel,
  onSubmit,
  form,
  initialValues,
}: EditModalProps) {
  return (
    <Modal
      title="修改行程命令"
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      width={600}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
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
  );
}
