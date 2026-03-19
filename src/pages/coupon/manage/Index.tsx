import {
  couponPage,
  couponSave,
  couponUpdate,
  couponDel,
} from "@/api/couponController";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";

/**
 * 优惠券管理页面
 */
export default function CouponManage() {
  const actionRef = useRef<ActionType>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.Coupon>();

  const onCreateSubmit = () => {
    setCreateModalOpen(false);
    actionRef.current?.reload();
  };

  const onEditSubmit = () => {
    setEditModalOpen(false);
    actionRef.current?.reload();
  };

  /** 删除优惠券 */
  const handleDelete = (id: number) => {
    couponDel({ id })
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

  const columns: ProColumns<API.Coupon>[] = [
    {
      title: "ID",
      dataIndex: "id",
      valueType: "digit",
      hideInForm: true,
      width: 80,
      hideInSearch: true,
    },
    {
      title: "优惠券名称",
      dataIndex: "name",
      formItemProps: {
        rules: [{ required: true, message: "请输入优惠券名称" }],
      },
      width: 160,
    },
    {
      title: "类型",
      dataIndex: "type",
      valueType: "select",
      width: 120,
      valueEnum: {
        "1": { text: "抵扣时长券" },
        "2": { text: "时长卡" },
      },
      fieldProps: {
        options: [
          { label: "抵扣时长券", value: "1" },
          { label: "时长卡", value: "2" },
        ],
      },
    },
    {
      title: "价格(元)",
      dataIndex: "price",
      valueType: "money",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "抵扣时长(分钟)",
      dataIndex: "freeDuration",
      valueType: "digit",
      width: 130,
      hideInSearch: true,
    },
    {
      title: "抵扣价格(元)",
      dataIndex: "freeAmount",
      valueType: "money",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "有效时长(天)",
      dataIndex: "effectiveDuration",
      valueType: "digit",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "运营商",
      dataIndex: "distributorName",
      hideInForm: true,
      width: 140,
      hideInSearch: true,
    },
    {
      title: "运营商ID",
      dataIndex: "distributorId",
      valueType: "digit",
      width: 120,
      hideInTable: true,
    },
    {
      title: "说明",
      dataIndex: "description",
      valueType: "textarea",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
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
      <Title level={3}>优惠券管理</Title>
      <ProTable<API.Coupon>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await couponPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            name: params.name,
            distributorId: params.distributorId,
            type: params.type,
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
        headerTitle="优惠券管理"
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
      <CreateFormModal<API.Coupon>
        visible={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSubmit={onCreateSubmit}
        columns={columns}
        title="新增优惠券"
        createApi={couponSave}
        successMessage="创建成功"
        loadingMessage="创建中..."
        errorMessage="创建失败"
      />
      <EditFormModal<API.Coupon>
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSubmit={onEditSubmit}
        columns={columns}
        initialValues={currentRow}
        title="编辑优惠券"
        updateApi={couponUpdate}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />
    </>
  );
}
