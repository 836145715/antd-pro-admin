import { Button, Descriptions, Modal, Tag, Typography } from "antd";

interface TripDetailModalProps {
  open: boolean;
  trip: API.Trip | undefined;
  onClose: () => void;
}

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

export default function TripDetailModal({
  open,
  trip,
  onClose,
}: TripDetailModalProps) {
  return (
    <Modal
      title="行程详情"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          关闭
        </Button>,
      ]}
      width={700}
    >
      {trip && (
        <Descriptions column={2} bordered>
          <Descriptions.Item label="ID">{trip.id}</Descriptions.Item>
          <Descriptions.Item label="自行车编号">
            {trip.qrNumber || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="设备ID">
            {trip.deviceId || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="用户ID">
            {trip.memberId || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="用户手机号">
            {trip.mobile || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="车类型">
            {trip.bicycleType
              ? bicycleTypeMap[trip.bicycleType]?.text || "-"
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="运营商">
            {trip.distributorName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="骑行状态">
            {trip.tripStatus
              ? tripStatusMap[trip.tripStatus]?.text || "-"
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="开始时间">
            {trip.startTime || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="结束时间">
            {trip.endTime || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="骑行时长">
            {trip.tripTimespan
              ? `${Math.floor((trip.tripTimespan || 0) / 60)}分${
                  (trip.tripTimespan || 0) % 60
                }秒`
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="骑行费用">
            <Typography.Text type="success">¥{trip.tripFee}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="调度费">
            <Typography.Text type="warning">
              ¥{trip.dispatchingFee}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="强制结束">
            <Tag color={trip.isCoercion === 1 ? "red" : "green"}>
              {trip.isCoercion === 1 ? "是" : "否"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="开锁地址" span={2}>
            {trip.openAddress || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="关锁地址" span={2}>
            {trip.lockAddress || "-"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
}
