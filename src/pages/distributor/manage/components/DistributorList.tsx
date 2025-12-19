import {
  distributorAccount,
  distributorPage,
  distributorSave,
  distributorSetting,
  distributorStatus,
} from "@/api/distributorController";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";
import { PlusOutlined } from "@ant-design/icons";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Tag, Typography } from "antd";
import React, { useRef, useState } from "react";
import AccountModal from "./AccountModal";
import SettingModal from "./SettingModal";

type DistributorRecord = API.Distributor;

const DistributorList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<DistributorRecord>();
  const [accountInitialValues, setAccountInitialValues] =
    useState<API.DistributorAccount>();
  const [settingInitialValues, setSettingInitialValues] =
    useState<API.DistributorSetting>();

  const refreshList = () => {
    actionRef.current?.reload();
  };

  const openEdit = (record: DistributorRecord) => {
    setCurrentRecord(record);
    setEditVisible(true);
  };

  const openAccountModal = async (record: DistributorRecord) => {
    if (!record.id) return;
    try {
      const res = await distributorAccount({ distributorId: record.id });
      if (res.data) {
        setAccountInitialValues(res.data);
      } else {
        setAccountInitialValues({ distributorId: record.id });
      }
      setCurrentRecord(record);
      setAccountVisible(true);
    } catch (error: any) {
      message.error("获取账户信息失败: " + error.message);
    }
  };

  const openSettingModal = async (record: DistributorRecord) => {
    if (!record.id) return;
    try {
      const res = await distributorSetting({ distributorId: record.id });
      if (res.data) {
        setSettingInitialValues(res.data);
      } else {
        setSettingInitialValues({ distributorId: record.id });
      }
      setCurrentRecord(record);
      setSettingVisible(true);
    } catch (error: any) {
      message.error("获取运营参数失败: " + error.message);
    }
  };

  const handleStatusChange = async (
    record: DistributorRecord,
    status: number
  ) => {
    try {
      await distributorStatus({ id: record.id, status });
      message.success("状态更新成功");
      refreshList();
    } catch (error: any) {
      message.error("状态更新失败: " + error.message);
    }
  };

  const distributorColumns: ProColumns<DistributorRecord>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      hideInForm: true,
      width: 80,
      fixed: "left",
    },
    {
      title: "关键词",
      dataIndex: "keyword",
      hideInTable: true,
    },
    {
      title: "运营商名称",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: true, message: "请输入运营商名称" }],
      },
      colProps: { span: 12 },
      width: 160,
    },
    {
      title: "负责人",
      dataIndex: "chargePerson",
      colProps: { span: 12 },
      width: 120,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      colProps: { span: 12 },
      width: 140,
    },
    {
      title: "登录名",
      dataIndex: "loginName",
      colProps: { span: 12 },
      width: 140,
      hideInSearch: true,
    },
    {
      title: "上级运营商ID",
      dataIndex: "parentId",
      valueType: "digit",
      colProps: { span: 12 },
      width: 140,
    },
    {
      title: "上级运营商",
      dataIndex: "parentName",
      hideInForm: true,
      hideInSearch: true,
      width: 140,
    },
    {
      title: "类型",
      dataIndex: "type",
      valueType: "select",
      valueEnum: {
        1: { text: "一级" },
        2: { text: "二级" },
        3: { text: "三级" },
      },
      colProps: { span: 12 },
      width: 100,
    },
    {
      title: "车辆类型",
      dataIndex: "bicycleType",
      valueType: "select",
      valueEnum: {
        1: { text: "自行车" },
        2: { text: "电动车" },
        3: { text: "蓝牙车" },
      },
      colProps: { span: 12 },
      width: 120,
    },
    {
      title: "收益比例(‰)",
      dataIndex: "earningsRatio",
      valueType: "digit",
      hideInSearch: true,
      colProps: { span: 12 },
      width: 140,
    },
    {
      title: "分红比例(‰)",
      dataIndex: "dividendRatio",
      valueType: "digit",
      hideInSearch: true,
      colProps: { span: 12 },
      width: 140,
    },
    {
      title: "是否运营",
      dataIndex: "isoperation",
      valueType: "select",
      valueEnum: {
        1: { text: "是" },
        0: { text: "否" },
      },
      colProps: { span: 12 },
      width: 100,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      valueEnum: {
        1: { text: "启用", status: "success" },
        0: { text: "停用", status: "default" },
      },
      colProps: { span: 12 },
      width: 100,
      render: (_, record) => (
        <Tag color={record.status === 1 ? "green" : "default"}>
          {record.status === 1 ? "启用" : "停用"}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "insertTime",
      valueType: "dateTime",
      hideInForm: true,
      hideInSearch: true,
      width: 180,
    },
    {
      title: "审批人",
      dataIndex: "approver",
      hideInForm: true,
      hideInSearch: true,
      width: 120,
    },
    {
      title: "审批时间",
      dataIndex: "approveTime",
      valueType: "dateTime",
      hideInForm: true,
      hideInSearch: true,
      width: 180,
    },
    {
      title: "操作",
      valueType: "option",
      width: 260,
      fixed: "right",
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => (
        <Space size="small">
          <Typography.Link onClick={() => openEdit(record)}>
            编辑
          </Typography.Link>
          <Typography.Link onClick={() => openAccountModal(record)}>
            账户
          </Typography.Link>
          <Typography.Link onClick={() => openSettingModal(record)}>
            参数
          </Typography.Link>
          {record.status === 1 ? (
            <Popconfirm
              title="确认停用该运营商吗？"
              onConfirm={() => handleStatusChange(record, 0)}
            >
              <Typography.Link type="danger">停用</Typography.Link>
            </Popconfirm>
          ) : (
            <Typography.Link onClick={() => handleStatusChange(record, 1)}>
              启用
            </Typography.Link>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<DistributorRecord>
        rowKey="id"
        actionRef={actionRef}
        columns={distributorColumns}
        cardBordered
        request={async (params) => {
          const res = await distributorPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            keyword: params.keyword,
            status: params.status,
            type: params.type,
            bicycleType: params.bicycleType,
            parentId: params.parentId,
            isoperation: params.isoperation,
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
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateVisible(true)}
          >
            新增运营商
          </Button>,
        ]}
      />

      <CreateFormModal<DistributorRecord>
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        onSubmit={() => {
          setCreateVisible(false);
          refreshList();
        }}
        columns={distributorColumns}
        title="新增运营商"
        createApi={distributorSave}
        successMessage="创建成功"
        loadingMessage="提交中..."
        errorMessage="创建失败"
      />

      <EditFormModal<DistributorRecord>
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        onSubmit={() => {
          setEditVisible(false);
          refreshList();
        }}
        columns={distributorColumns}
        initialValues={currentRecord}
        title="编辑运营商"
        updateApi={distributorSave}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />

      <AccountModal
        visible={accountVisible}
        onCancel={() => setAccountVisible(false)}
        distributorId={currentRecord?.id}
        distributorName={currentRecord?.name}
        initialValues={accountInitialValues}
      />

      <SettingModal
        visible={settingVisible}
        onCancel={() => setSettingVisible(false)}
        distributorId={currentRecord?.id}
        distributorName={currentRecord?.name}
        initialValues={settingInitialValues}
      />
    </>
  );
};

export default DistributorList;
