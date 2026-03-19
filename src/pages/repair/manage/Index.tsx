import { repairPage, handleRepair } from "@/api/repairRecordController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Tag, Typography, Modal, Input, Image } from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";

/**
 * 报修管理页面
 */
export default function RepairManage() {
  const actionRef = useRef<ActionType>(null);
  const [handleModalOpen, setHandleModalOpen] = useState(false);
  const [handleId, setHandleId] = useState<number>();
  const [csRemark, setCsRemark] = useState("");

  /** 处理报修 */
  const doHandle = async () => {
    if (!handleId) return;
    try {
      const res = await handleRepair({ id: handleId }, csRemark || "");
      if (res.success) {
        message.success("处理成功");
        setHandleModalOpen(false);
        setCsRemark("");
        actionRef.current?.reload();
      } else {
        message.error(res.message || "处理失败");
      }
    } catch (e: any) {
      message.error("处理失败: " + e.message);
    }
  };

  const columns: ProColumns<API.RepairRecord>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      width: 80,
      hideInSearch: true,
    },
    {
      title: "车牌编号",
      dataIndex: "qrNumber",
      width: 120,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: 140,
      copyable: true,
    },
    {
      title: "姓名",
      dataIndex: "realName",
      width: 100,
      hideInSearch: true,
    },
    {
      title: "报修部位",
      dataIndex: "repairParts",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "反馈信息",
      dataIndex: "feedback",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "图片",
      dataIndex: "picUrl",
      width: 100,
      hideInSearch: true,
      render: (_, record) =>
        record.picUrl ? (
          <Image src={record.picUrl} width={60} height={60} />
        ) : (
          "-"
        ),
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      width: 100,
      valueEnum: {
        0: { text: "未解决", status: "error" },
        1: { text: "已解决", status: "success" },
      },
      render: (_, record) => (
        <Tag color={record.status === 1 ? "green" : "red"}>
          {record.status === 1 ? "已解决" : "未解决"}
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
      title: "客服备注",
      dataIndex: "csRemark",
      width: 160,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "提交时间",
      dataIndex: "insertTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
    },
    {
      title: "解决时间",
      dataIndex: "solveTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 100,
      fixed: "right",
      render: (_, record) =>
        record.status === 0 ? (
          <Typography.Link
            onClick={() => {
              setHandleId(record.id);
              setCsRemark("");
              setHandleModalOpen(true);
            }}
          >
            处理
          </Typography.Link>
        ) : (
          <Typography.Text type="secondary">已处理</Typography.Text>
        ),
    },
  ];

  return (
    <>
      <Title level={3}>报修管理</Title>
      <ProTable<API.RepairRecord>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await repairPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            status: params.status,
            qrNumber: params.qrNumber,
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
        headerTitle="报修管理"
        scroll={{ x: 1400 }}
      />

      {/* 处理报修弹窗 */}
      <Modal
        title="处理报修"
        open={handleModalOpen}
        onOk={doHandle}
        onCancel={() => setHandleModalOpen(false)}
        okText="确认处理"
        cancelText="取消"
      >
        <div style={{ marginBottom: 8 }}>
          <span>客服备注（可选）：</span>
        </div>
        <Input.TextArea
          rows={4}
          placeholder="请输入客服备注"
          value={csRemark}
          onChange={(e) => setCsRemark(e.target.value)}
        />
      </Modal>
    </>
  );
}
