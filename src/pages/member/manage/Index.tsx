import {
  memberPage,
  toBlack,
  toOperations,
  bindDistributor,
  unbindDistributor,
} from "@/api/memberInfoController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  message,
  Popconfirm,
  Space,
  Tag,
  Typography,
  Modal,
  InputNumber,
} from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";

/**
 * 会员管理页面
 */
export default function MemberManage() {
  const actionRef = useRef<ActionType>(null);
  const [bindModalOpen, setBindModalOpen] = useState(false);
  const [bindingMemberId, setBindingMemberId] = useState<number>();
  const [distributorIdInput, setDistributorIdInput] = useState<number>();

  /** 拉黑 / 解除拉黑 */
  const handleBlack = async (id: number, type: number) => {
    try {
      const res = await toBlack({ id, type });
      if (res.success) {
        message.success(type === 0 ? "已拉黑" : "已解除拉黑");
        actionRef.current?.reload();
      } else {
        message.error(res.message || "操作失败");
      }
    } catch (e: any) {
      message.error("操作失败: " + e.message);
    }
  };

  /** 设置 / 取消运维人员 */
  const handleOperations = async (id: number, type: number) => {
    try {
      const res = await toOperations({ id, type });
      if (res.success) {
        message.success(type === 1 ? "已设为运维" : "已取消运维");
        actionRef.current?.reload();
      } else {
        message.error(res.message || "操作失败");
      }
    } catch (e: any) {
      message.error("操作失败: " + e.message);
    }
  };

  /** 解绑运营商 */
  const handleUnbind = async (id: number) => {
    try {
      const res = await unbindDistributor({ id });
      if (res.success) {
        message.success("已解绑运营商");
        actionRef.current?.reload();
      } else {
        message.error(res.message || "解绑失败");
      }
    } catch (e: any) {
      message.error("解绑失败: " + e.message);
    }
  };

  /** 绑定运营商 */
  const handleBind = async () => {
    if (!bindingMemberId || !distributorIdInput) {
      message.warning("请输入运营商ID");
      return;
    }
    try {
      const res = await bindDistributor({
        memberId: bindingMemberId,
        distributorId: distributorIdInput,
      });
      if (res.success) {
        message.success("绑定成功");
        setBindModalOpen(false);
        setDistributorIdInput(undefined);
        actionRef.current?.reload();
      } else {
        message.error(res.message || "绑定失败");
      }
    } catch (e: any) {
      message.error("绑定失败: " + e.message);
    }
  };

  const columns: ProColumns<API.MemberInfo>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      width: 80,
      hideInSearch: true,
    },
    {
      title: "姓名",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: 140,
      copyable: true,
    },
    {
      title: "余额",
      dataIndex: "balance",
      valueType: "money",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      width: 100,
      valueEnum: {
        1: { text: "正常", status: "success" },
        2: { text: "骑行中", status: "processing" },
        0: { text: "已拉黑", status: "error" },
      },
      render: (_, record) => {
        const map: Record<number, { color: string; text: string }> = {
          1: { color: "green", text: "正常" },
          2: { color: "blue", text: "骑行中" },
          0: { color: "red", text: "已拉黑" },
        };
        const item = map[record.status ?? 1];
        return <Tag color={item?.color}>{item?.text}</Tag>;
      },
    },
    {
      title: "登录方式",
      dataIndex: "loginFlag",
      valueType: "select",
      width: 100,
      hideInSearch: true,
      valueEnum: {
        1: { text: "微信" },
        2: { text: "支付宝" },
      },
    },
    {
      title: "骑乘次数",
      dataIndex: "tripCount",
      valueType: "digit",
      width: 100,
      hideInSearch: true,
    },
    {
      title: "总消费",
      dataIndex: "totalFee",
      valueType: "money",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "运维",
      dataIndex: "isMaintain",
      valueType: "select",
      width: 80,
      valueEnum: {
        0: { text: "否" },
        1: { text: "是" },
      },
      render: (_, record) => (
        <Tag color={record.isMaintain === 1 ? "blue" : "default"}>
          {record.isMaintain === 1 ? "是" : "否"}
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
      title: "注册时间",
      dataIndex: "insertTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 320,
      fixed: "right",
      render: (_, record) => (
        <Space key={record.id} wrap>
          {/* 拉黑/解黑 */}
          {record.status !== 0 ? (
            <Popconfirm
              title="确认拉黑该会员？"
              onConfirm={() => record.id && handleBlack(record.id, 0)}
            >
              <Typography.Link type="danger">拉黑</Typography.Link>
            </Popconfirm>
          ) : (
            <Typography.Link
              onClick={() => record.id && handleBlack(record.id, 1)}
            >
              解黑
            </Typography.Link>
          )}
          {/* 运维设置 */}
          {record.isMaintain !== 1 ? (
            <Typography.Link
              onClick={() => record.id && handleOperations(record.id, 1)}
            >
              设为运维
            </Typography.Link>
          ) : (
            <Typography.Link
              onClick={() => record.id && handleOperations(record.id, 0)}
            >
              取消运维
            </Typography.Link>
          )}
          {/* 绑定/解绑运营商 */}
          {record.distributorId ? (
            <Popconfirm
              title="确认解绑运营商？"
              onConfirm={() => record.id && handleUnbind(record.id)}
            >
              <Typography.Link>解绑运营商</Typography.Link>
            </Popconfirm>
          ) : (
            <Typography.Link
              onClick={() => {
                setBindingMemberId(record.id);
                setBindModalOpen(true);
              }}
            >
              绑定运营商
            </Typography.Link>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>会员管理</Title>
      <ProTable<API.MemberInfo>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await memberPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            name: params.name,
            mobile: params.mobile,
            status: params.status,
            distributorId: params.distributorId,
            isMaintain: params.isMaintain,
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
        headerTitle="会员管理"
        scroll={{ x: 1400 }}
      />

      {/* 绑定运营商弹窗 */}
      <Modal
        title="绑定运营商"
        open={bindModalOpen}
        onOk={handleBind}
        onCancel={() => {
          setBindModalOpen(false);
          setDistributorIdInput(undefined);
        }}
        okText="确定"
        cancelText="取消"
      >
        <div style={{ marginBottom: 16 }}>
          <span>运营商ID：</span>
          <InputNumber
            style={{ width: 200 }}
            placeholder="请输入运营商ID"
            value={distributorIdInput}
            onChange={(val) => setDistributorIdInput(val ?? undefined)}
          />
        </div>
      </Modal>
    </>
  );
}
