import { loginRecordPage } from "@/api/loginRecordController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import Title from "antd/es/typography/Title";
import { useRef } from "react";

/**
 * 登录日志页面（只读）
 */
export default function LoginRecordManage() {
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<API.LoginRecord>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      width: 80,
      hideInSearch: true,
    },
    {
      title: "用户账号",
      dataIndex: "username",
      width: 140,
    },
    {
      title: "用户昵称",
      dataIndex: "nickName",
      width: 140,
      hideInSearch: true,
    },
    {
      title: "操作系统",
      dataIndex: "osName",
      width: 140,
      hideInSearch: true,
    },
    {
      title: "设备",
      dataIndex: "device",
      width: 140,
      hideInSearch: true,
    },
    {
      title: "浏览器",
      dataIndex: "browserType",
      width: 140,
      hideInSearch: true,
    },
    {
      title: "IP地址",
      dataIndex: "ipAddress",
      width: 160,
      hideInSearch: true,
      copyable: true,
    },
    {
      title: "登录时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      width: 180,
      hideInSearch: true,
    },
    {
      title: "开始日期",
      dataIndex: "startDate",
      valueType: "date",
      hideInTable: true,
    },
    {
      title: "结束日期",
      dataIndex: "endDate",
      valueType: "date",
      hideInTable: true,
    },
  ];

  return (
    <>
      <Title level={3}>登录日志</Title>
      <ProTable<API.LoginRecord>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await loginRecordPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            account: params.username,
            startDate: params.startDate,
            endDate: params.endDate,
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
        headerTitle="登录日志"
      />
    </>
  );
}
