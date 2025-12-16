

import { deleteRole, getRoleList } from "@/api/roleController";
import {
  ProTable,
  type ProColumns,
  type ActionType,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm } from "antd";
import { useRef, useState } from "react";
import CreateModal from "./components/CreateModal";
import EditModal from "./components/EditModal";
import AuthorizeModal from "./components/AuthorizeModal";

const RoleManage = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [authorizeModalVisible, setAuthorizeModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState<API.Role>();
  const actionRef = useRef<ActionType>();

  // 刷新列表
  const refreshList = () => {
    actionRef.current?.reload();
  };

  // 处理删除
  const handleDelete = async (record: API.Role) => {
    try {
      await deleteRole({ id: record.roleId! });
      message.success("删除成功");
      refreshList();
    } catch (error: any) {
      message.error("删除失败：" + error.message);
    }
  };

  // 处理编辑
  const handleEdit = (record: API.Role) => {
    setCurrentRole(record);
    setEditModalVisible(true);
  };

  // 处理授权
  const handleAuthorize = (record: API.Role) => {
    setCurrentRole(record);
    setAuthorizeModalVisible(true);
  };

  const columns: ProColumns<API.Role>[] = [
    {
      title: "角色ID",
      dataIndex: "roleId",
      width: 80,
      search: false,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      width: 120,
      ellipsis: true,
    },
    {
      title: "备注",
      dataIndex: "comments",
      width: 200,
      ellipsis: true,
      search: false,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: 160,
      valueType: "dateTime",
      search: false,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      width: 160,
      valueType: "dateTime",
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      fixed: "right",
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Button
          key="authorize"
          type="link"
          size="small"
          onClick={() => handleAuthorize(record)}
        >
          分配权限
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这个角色吗？"
          onConfirm={() => handleDelete(record)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" size="small" danger>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.Role>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          try {
            const response = await getRoleList();
            if (response.success && response.data) {
              let data = response.data;

              // 前端搜索过滤
              if (params.roleName) {
                data = data.filter(item =>
                  item.roleName?.includes(params.roleName as string)
                );
              }

              return {
                data,
                success: true,
                total: data.length,
              };
            }
            return {
              data: [],
              success: false,
              total: 0,
            };
          } catch (error) {
            message.error("获取角色列表失败");
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="roleId"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="角色管理"
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            新建角色
          </Button>,
        ]}
      />

      {/* 创建角色弹窗 */}
      <CreateModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          refreshList();
        }}
      />

      {/* 编辑角色弹窗 */}
      <EditModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSubmit={() => {
          setEditModalVisible(false);
          refreshList();
        }}
        initialValues={currentRole}
      />

      {/* 分配权限弹窗 */}
      <AuthorizeModal
        visible={authorizeModalVisible}
        onCancel={() => setAuthorizeModalVisible(false)}
        onSubmit={() => {
          setAuthorizeModalVisible(false);
          refreshList();
        }}
        roleId={currentRole?.roleId}
      />
    </div>
  );
};

export default RoleManage;
