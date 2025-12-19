import {
  withdrawalAudit,
  withdrawalConfirm,
  withdrawalPage,
} from "@/api/distributorController";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { message, Popconfirm, Space, Typography } from "antd";
import React, { useRef } from "react";

const WithdrawalList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const refreshWithdrawal = () => {
    actionRef.current?.reload();
  };

  const handleAudit = async (
    record: API.DistributorWithdrawal,
    status: number
  ) => {
    try {
      await withdrawalAudit({ id: record.id, status });
      message.success("审核成功");
      refreshWithdrawal();
    } catch (error: any) {
      message.error("审核失败: " + error.message);
    }
  };

  const handleConfirmPay = async (
    record: API.DistributorWithdrawal,
    success: boolean
  ) => {
    try {
      await withdrawalConfirm({
        id: record.id,
        success,
        flowNumber: record.flowNumber,
      });
      message.success(success ? "打款已确认" : "已标记打款失败");
      refreshWithdrawal();
    } catch (error: any) {
      message.error("操作失败: " + error.message);
    }
  };

  const withdrawalColumns: ProColumns<API.DistributorWithdrawal>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      width: 80,
      fixed: "left",
    },
    {
      title: "运营商",
      dataIndex: "distributor",
      width: 160,
      hideInForm: true,
    },
    {
      title: "上级运营商",
      dataIndex: "parentName",
      width: 160,
      hideInForm: true,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: 140,
    },
    {
      title: "提现金额",
      dataIndex: "applyNum",
      valueType: "money",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "账户类型",
      dataIndex: "accountType",
      valueType: "select",
      valueEnum: {
        1: { text: "平台" },
        2: { text: "二级运营商" },
        3: { text: "三级运营商" },
      },
      width: 140,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      valueEnum: {
        0: { text: "申请中", status: "warning" },
        1: { text: "同意", status: "success" },
        2: { text: "不同意", status: "error" },
        3: { text: "打款成功", status: "success" },
        4: { text: "打款失败", status: "error" },
      },
      width: 120,
    },
    {
      title: "申请时间",
      dataIndex: "applyTime",
      valueType: "dateTime",
      hideInForm: true,
      width: 180,
    },
    {
      title: "申请时间",
      dataIndex: "applyRange",
      valueType: "dateTimeRange",
      hideInTable: true,
      search: {
        transform: (value) => ({
          startTime: value?.[0],
          endTime: value?.[1],
        }),
      },
    },
    {
      title: "审核时间",
      dataIndex: "approveTime",
      valueType: "dateTime",
      hideInForm: true,
      hideInSearch: true,
      width: 180,
    },
    {
      title: "打款时间",
      dataIndex: "confirmTime",
      valueType: "dateTime",
      hideInForm: true,
      hideInSearch: true,
      width: 180,
    },
    {
      title: "流水号",
      dataIndex: "flowNumber",
      width: 160,
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      width: 220,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="确认同意该提现申请？"
            onConfirm={() => handleAudit(record, 1)}
            disabled={record.status !== 0}
          >
            <Typography.Link disabled={record.status !== 0}>
              同意
            </Typography.Link>
          </Popconfirm>
          <Popconfirm
            title="确认拒绝该提现申请？"
            onConfirm={() => handleAudit(record, 2)}
            disabled={record.status !== 0}
          >
            <Typography.Link type="danger" disabled={record.status !== 0}>
              拒绝
            </Typography.Link>
          </Popconfirm>
          <Popconfirm
            title="确认已成功打款？"
            onConfirm={() => handleConfirmPay(record, true)}
            disabled={record.status !== 1}
          >
            <Typography.Link disabled={record.status !== 1}>
              打款成功
            </Typography.Link>
          </Popconfirm>
          <Popconfirm
            title="确认标记打款失败？"
            onConfirm={() => handleConfirmPay(record, false)}
            disabled={record.status !== 1}
          >
            <Typography.Link type="danger" disabled={record.status !== 1}>
              打款失败
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.DistributorWithdrawal>
      rowKey="id"
      actionRef={actionRef}
      columns={withdrawalColumns}
      cardBordered
      request={async (params) => {
        const res = await withdrawalPage({
          pageNum: params.current,
          pageSize: params.pageSize,
          distributorId: params.distributorId,
          parentId: params.parentId,
          accountType: params.accountType,
          status: params.status,
          mobile: params.mobile,
          startTime: params.startTime,
          endTime: params.endTime,
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
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
      }}
      search={{
        labelWidth: "auto",
      }}
    />
  );
};

export default WithdrawalList;
