import {
  areaPage,
  areaSave,
  areaUpdate,
  areaDel,
} from "@/api/operatingAreaController";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";

/**
 * 运营区域管理页面
 */
export default function OperatingAreaManage() {
  const actionRef = useRef<ActionType>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.OperatingArea>();

  const onCreateSubmit = () => {
    setCreateModalOpen(false);
    actionRef.current?.reload();
  };

  const onEditSubmit = () => {
    setEditModalOpen(false);
    actionRef.current?.reload();
  };

  /** 删除运营区域 */
  const handleDelete = (id: number) => {
    areaDel({ id })
      .then((res: any) => {
        if (res.success) {
          message.success("删除成功");
          actionRef.current?.reload();
        } else {
          message.error("删除失败: " + res.message);
        }
      })
      .catch((error: any) => {
        message.error("删除失败: " + error.message);
      });
  };

  const columns: ProColumns<API.OperatingArea>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      hideInForm: true,
      width: 80,
      hideInSearch: true,
    },
    {
      title: "名称",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: true, message: "请输入区域名称" }],
      },
      width: 160,
    },
    {
      title: "描述",
      dataIndex: "description",
      valueType: "textarea",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "运营商ID",
      dataIndex: "distributorId",
      valueType: "digit",
      width: 120,
      hideInTable: true,
    },
    {
      title: "运营商",
      dataIndex: "distributorName",
      hideInForm: true,
      width: 140,
      hideInSearch: true,
    },
    {
      title: "区域坐标",
      dataIndex: "area",
      valueType: "textarea",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: "中心点",
      dataIndex: "centerPoint",
      width: 160,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: "select",
      width: 100,
      valueEnum: {
        1: { text: "启用", status: "success" },
        0: { text: "停用", status: "default" },
      },
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
      title: "操作",
      valueType: "option",
      key: "option",
      width: 180,
      fixed: "right",
      render: (_, record) => (
        <Space key={record.id}>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setEditModalOpen(true);
            }}
          >
            编辑
          </Typography.Link>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => {
              if (record?.id) handleDelete(record.id);
            }}
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={3}>运营区域管理</Title>
      <ProTable<API.OperatingArea>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await areaPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            name: params.name,
            distributorId: params.distributorId,
            status: params.status,
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
        headerTitle="运营区域管理"
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            onClick={() => setCreateModalOpen(true)}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateFormModal<API.OperatingArea>
        visible={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSubmit={onCreateSubmit}
        columns={columns}
        title="新增运营区域"
        createApi={areaSave}
        successMessage="创建成功"
        loadingMessage="创建中..."
        errorMessage="创建失败"
      />
      <EditFormModal<API.OperatingArea>
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSubmit={onEditSubmit}
        columns={columns}
        initialValues={currentRow}
        title="编辑运营区域"
        updateApi={areaUpdate}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />
    </>
  );
}
