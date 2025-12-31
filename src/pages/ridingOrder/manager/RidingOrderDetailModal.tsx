import { Button, Descriptions, Modal, Tag, Typography } from "antd";

interface RidingOrderDetailModalProps {
  open: boolean;
  order: API.MemberRidingOrder | undefined;
  onClose: () => void;
}

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

export default function RidingOrderDetailModal({
  open,
  order,
  onClose,
}: RidingOrderDetailModalProps) {
  return (
    <Modal
      title="行程订单详情"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          关闭
        </Button>,
      ]}
      width={800}
    >
      {order && (
        <Descriptions column={2} bordered>
          <Descriptions.Item label="ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="会员ID">{order.memberId}</Descriptions.Item>
          <Descriptions.Item label="手机号">{order.mobile || "-"}</Descriptions.Item>
          <Descriptions.Item label="商户订单号">
            {order.tradeNo || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="商户交易单号">
            {order.transactionId || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="锁编号">{order.qrNumber || "-"}</Descriptions.Item>
          <Descriptions.Item label="行程ID">{order.tripId || "-"}</Descriptions.Item>
          <Descriptions.Item label="运营商">{order.distributor || "-"}</Descriptions.Item>
          <Descriptions.Item label="车辆类型">
            {order.lockType ? (
              <Tag color={lockTypeMap[order.lockType]?.color}>
                {lockTypeMap[order.lockType]?.text}
              </Tag>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="支付状态">
            {order.hasPaid !== undefined ? (
              <Tag color={hasPaidMap[order.hasPaid]?.color}>
                {hasPaidMap[order.hasPaid]?.text}
              </Tag>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="支付类型">
            {order.rechargeType ? (
              <Tag color={rechargeTypeMap[order.rechargeType]?.color}>
                {rechargeTypeMap[order.rechargeType]?.text}
              </Tag>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="预充值金额">
            <Typography.Text type="success">
              ¥{order.preMoney}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="消费金额">
            <Typography.Text type="warning">
              ¥{order.costAmount}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="需支付金额">
            <Typography.Text type="danger">
              ¥{order.needAmount}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="骑行时长">
            {order.tripTimespan
              ? `${Math.floor((order.tripTimespan || 0) / 60)}分${
                  (order.tripTimespan || 0) % 60
                }秒`
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="开始时间">
            {order.startTime || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="结束时间">
            {order.endTime || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="添加时间">
            {order.insertTime || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="通知时间">
            {order.notifyTime || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="备注" span={2}>
            {order.remark || "-"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
}