import {
  distributorAccount,
  distributorAccountSave,
  distributorPage,
  distributorSave,
  distributorSetting,
  distributorSettingSave,
  distributorStatus,
  withdrawalAudit,
  withdrawalConfirm,
  withdrawalPage,
} from "@/api/distributorController";
import {
  ProCard,
  type ProColumns,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import {
  Button,
  message,
  Modal,
  Popconfirm,
  Space,
  Tag,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";

type DistributorRecord = API.Distributor;

const DistributorManage = () => {
  const actionRef = useRef<ActionType>();
  const withdrawalActionRef = useRef<ActionType>();

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

  const refreshWithdrawal = () => {
    withdrawalActionRef.current?.reload();
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
      width: 160,
    },
    {
      title: "负责人",
      dataIndex: "chargePerson",
      width: 120,
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: 140,
    },
    {
      title: "登录名",
      dataIndex: "loginName",
      width: 140,
      hideInSearch: true,
    },
    {
      title: "上级运营商ID",
      dataIndex: "parentId",
      valueType: "digit",
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
      width: 120,
    },
    {
      title: "收益比例(‰)",
      dataIndex: "earningsRatio",
      valueType: "digit",
      hideInSearch: true,
      width: 140,
    },
    {
      title: "分红比例(‰)",
      dataIndex: "dividendRatio",
      valueType: "digit",
      hideInSearch: true,
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
    <ProCard tabs={{ type: "card" }}>
      <ProCard.TabPane key="list" tab="运营商列表">
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

        <Modal
          title={`账户信息 - ${currentRecord?.name || ""}`}
          open={accountVisible}
          onCancel={() => setAccountVisible(false)}
          footer={null}
          destroyOnClose
        >
          <ProForm<API.DistributorAccount>
            initialValues={accountInitialValues}
            onFinish={async (values) => {
              if (!currentRecord?.id) return false;
              await distributorAccountSave({
                distributorId: currentRecord.id,
                ...accountInitialValues,
                ...values,
              });
              message.success("账户信息已保存");
              setAccountVisible(false);
              return true;
            }}
            submitter={{
              searchConfig: { submitText: "保存", resetText: "重置" },
            }}
          >
            <ProFormText name="aliPay" label="支付宝账号" />
            <ProFormText name="weixinPay" label="微信账号" />
            <ProFormText name="bankAccount" label="银行卡号" />
            <ProFormText name="bankType" label="银行类别" />
            <ProFormText name="realName" label="真实姓名" />
            <ProFormText name="mobile" label="手机号" />
            <ProFormText name="email" label="邮箱" />
            <ProFormText name="payName" label="支付宝转款姓名" />
            <ProFormText name="payAccount" label="支付宝转款账号" />
            <ProFormTextArea name="payRemark" label="支付备注" />
          </ProForm>
        </Modal>

        <Modal
          title={`运营参数 - ${currentRecord?.name || ""}`}
          open={settingVisible}
          onCancel={() => setSettingVisible(false)}
          footer={null}
          destroyOnClose
          width={720}
        >
          <ProForm<API.DistributorSetting>
            initialValues={settingInitialValues}
            onFinish={async (values) => {
              if (!currentRecord?.id) return false;
              await distributorSettingSave({
                distributorId: currentRecord.id,
                ...settingInitialValues,
                ...values,
              });
              message.success("运营参数已保存");
              setSettingVisible(false);
              return true;
            }}
            submitter={{
              searchConfig: { submitText: "保存", resetText: "重置" },
            }}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <ProFormDigit name="precharge" label="预充金额" />
            <ProFormDigit name="minute" label="免费分钟" />
            <ProFormDigit name="minuteFee" label="每分钟金额" />
            <ProFormDigit name="overMinute" label="超出分钟段" />
            <ProFormDigit name="overminuteFee" label="超出金额" />
            <ProFormDigit name="lastMinute" label="最后每增加(分钟)" />
            <ProFormDigit name="lastMinuteFee" label="最后每增加费用" />
            <ProFormDigit name="dispatchingFee" label="调度费用" />
            <ProFormSelect
              name="isannounce"
              label="是否通知"
              valueEnum={{ 0: "关闭", 1: "开启" }}
            />
            <ProFormText name="announceTitle" label="通知标题" />
            <ProFormTextArea name="announceContent" label="通知内容" />
            <ProFormText name="mobile" label="联系电话" />
            <ProFormText name="sweepCodeTip" label="扫码提示" />
          </ProForm>
        </Modal>
      </ProCard.TabPane>

      <ProCard.TabPane key="withdrawal" tab="提现记录">
        <ProTable<API.DistributorWithdrawal>
          rowKey="id"
          actionRef={withdrawalActionRef}
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
      </ProCard.TabPane>
    </ProCard>
  );
};

export default DistributorManage;
