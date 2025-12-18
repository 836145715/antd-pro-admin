import {
  userDel,
  userPage,
  userResetPwd,
  userSave,
  userUpdate,
  userAssignRoles,
  userGetRoles,
} from "@/api/userController";
import { roleList } from "@/api/roleController";
import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Typography,
  Checkbox,
  Modal,
} from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState, useEffect } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";
import UserRolesDisplay from "@/components/UserRolesDisplay";

/**
 * 用户管理页面
 */
export default function UserManager() {
  const actionRef = useRef<ActionType>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.User>();
  const [roleAssignVisible, setRoleAssignVisible] = useState(false);
  const [allRoles, setAllRoles] = useState<API.Role[]>([]);
  const [userRoles, setUserRoles] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  // 初始化角色数据
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await roleList();
        if (res.success && res.data) {
          setAllRoles(res.data);
        }
      } catch (error) {
        message.error("获取角色列表失败");
      }
    };
    fetchRoles();
  }, []);

  const onCreateSubmit = () => {
    setCreateModalOpen(false);
    actionRef.current?.reload();
  };

  const onEditSubmit = (values: API.User) => {
    setEditModalOpen(false);
    actionRef.current?.reload();
  };

  const handleDelete = (id: string) => {
    userDel({ id })
      .then((res) => {
        if (res.success) {
          message.success("删除成功");
          actionRef.current?.reload();
        } else {
          message.error("删除失败: " + res.message);
        }
      })
      .catch((error) => {
        message.error("删除失败: " + error.message);
      });
  };

  const handleResetPassword = (id: string) => {
    userResetPwd({ id })
      .then((res) => {
        if (res.success) {
          message.success("密码重置成功");
          actionRef.current?.reload();
        } else {
          message.error("密码重置失败: " + res.message);
        }
      })
      .catch((error) => {
        message.error("密码重置失败: " + error.message);
      });
  };

  // 打开角色授予弹窗
  const handleAssignRoles = async (record: API.User) => {
    try {
      const res = await userGetRoles({ userId: record.userId! });
      if (res.success && res.data) {
        setUserRoles(res.data);
        setSelectedRoles(res.data);
      }
      setCurrentRow(record);
      setRoleAssignVisible(true);
    } catch (error) {
      message.error("获取用户角色失败");
    }
  };

  // 提交角色分配
  const handleRoleAssignSubmit = async () => {
    if (!currentRow?.userId) return;

    try {
      await userAssignRoles({
        userId: currentRow.userId,
        roleIds: selectedRoles,
      });
      message.success("角色分配成功");
      setRoleAssignVisible(false);
      actionRef.current?.reload();
    } catch (error: any) {
      message.error("角色分配失败：" + error.message);
    }
  };

  const columns: ProColumns<API.User>[] = [
    {
      title: "ID",
      dataIndex: "userId",
      valueType: "digit",
      hideInForm: true,
      fixed: "left",
      width: 80,
    },
    {
      title: "用户名",
      dataIndex: "username",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true, message: "请输入用户名" }],
      },
      width: 120,
      copyable: true,
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      valueType: "text",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "真实姓名",
      dataIndex: "trueName",
      valueType: "text",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      valueType: "text",
      width: 180,
      hideInSearch: true,
      formItemProps: {
        rules: [{ type: "email", message: "请输入有效的邮箱地址" }],
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
      valueType: "text",
      width: 150,
    },
    {
      title: "性别",
      dataIndex: "sex",
      valueType: "select",
      width: 80,
      hideInSearch: true,
      valueEnum: {
        male: { text: "男" },
        female: { text: "女" },
        other: { text: "其他" },
      },
      fieldProps: {
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
          { label: "其他", value: "other" },
        ],
      },
    },
    {
      title: "状态",
      dataIndex: "state",
      valueType: "select",
      width: 100,
      hideInSearch: true,
      valueEnum: {
        0: { text: "正常" },
        1: { text: "冻结" },
      },
      fieldProps: {
        options: [
          { label: "正常", value: 0 },
          { label: "冻结", value: 1 },
        ],
      },
    },
    {
      title: "角色",
      dataIndex: "roles",
      width: 200,
      hideInSearch: true,
      hideInForm: true,
      render: (_, record) => {
        // 使用 UserRolesDisplay 组件显示用户的角色
        return (
          <UserRolesDisplay roleIds={record.roleIds} allRoles={allRoles} />
        );
      },
    },
    {
      title: "头像",
      dataIndex: "avatar",
      valueType: "image",
      width: 100,
      hideInSearch: true,
      hideInForm: true,
      fieldProps: {
        width: 64,
        height: 64,
        style: { borderRadius: "50%" },
      },
    },
    {
      title: "邮箱验证",
      dataIndex: "emailVerified",
      valueType: "select",
      width: 100,
      hideInSearch: true,
      valueEnum: {
        0: { text: "未验证" },
        1: { text: "已验证" },
      },
      fieldProps: {
        options: [
          { label: "未验证", value: 0 },
          { label: "已验证", value: 1 },
        ],
      },
    },
    {
      title: "身份证号",
      dataIndex: "idCard",
      valueType: "text",
      width: 180,
      hideInSearch: true,
    },
    {
      title: "出生日期",
      dataIndex: "birthday",
      valueType: "date",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      sorter: true,
      hideInForm: true,
      width: 180,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      sorter: true,
      hideInForm: true,
      width: 180,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 280,
      fixed: "right",
      render: (_, record) => [
        <Space key={record.userId} wrap>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setEditModalOpen(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              handleAssignRoles(record);
            }}
          >
            <TeamOutlined /> 角色授予
          </Typography.Link>
          <Popconfirm
            title="确定要重置该用户的密码吗？"
            onConfirm={() => {
              if (record?.userId) {
                handleResetPassword(record.userId.toString());
              }
            }}
          >
            <Typography.Link>重置密码</Typography.Link>
          </Popconfirm>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => {
              if (record?.userId) {
                handleDelete(record.userId.toString());
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
      <Title level={3}>用户管理</Title>
      <ProTable<API.User>
        rowKey="userId"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          console.log(params);
          const res = await userPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            id: params.userId,
            username: params.username,
            phone: params.phone,
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
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-user-manage",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
          onChange(value) {
            console.log("onChange value: ", value);
          },
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
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户管理"
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
        ]}
      />
      <CreateFormModal<API.User>
        visible={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSubmit={onCreateSubmit}
        columns={columns}
        title="创建用户"
        createApi={userSave}
        successMessage="提交成功"
        loadingMessage="提交中..."
        errorMessage="创建失败"
      />

      <EditFormModal<API.User>
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSubmit={onEditSubmit}
        columns={columns}
        initialValues={currentRow}
        title="更新用户"
        updateApi={userUpdate}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />

      {/* 角色授予弹窗 */}
      <Modal
        title={`角色授予 - ${currentRow?.username || ""}`}
        open={roleAssignVisible}
        onCancel={() => setRoleAssignVisible(false)}
        onOk={handleRoleAssignSubmit}
        width={500}
      >
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          <Checkbox.Group
            value={selectedRoles}
            onChange={(checkedValues) =>
              setSelectedRoles(checkedValues as number[])
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {allRoles.map((role) => (
                <Checkbox key={role.roleId} value={role.roleId}>
                  {role.roleName}
                  {role.comments && (
                    <span style={{ color: "#999", marginLeft: 8 }}>
                      ({role.comments})
                    </span>
                  )}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      </Modal>
    </>
  );
}
