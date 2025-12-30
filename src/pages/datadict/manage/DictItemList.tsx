import {
  dictItemPage,
  dictItemSave,
  dictItemUpdate,
  dictItemDel,
} from "@/api/datadictItemController";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Typography,
  Card,
  Tag,
} from "antd";
import { useRef, useState } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";

interface DictItemListProps {
  selectedDict?: API.Datadict;
}

export default function DictItemList({ selectedDict }: DictItemListProps) {
  const actionRef = useRef<ActionType>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<API.DatadictItem>();

  // 字典明细相关操作
  const onItemCreateSubmit = (dictItem: API.DatadictItem) => {
    console.log("createModalOpen", selectedDict, dictItem);
    dictItemSave({
      ...dictItem,
      did: selectedDict?.id || "",
    }).then((res) => {
      if (res.success) {
        message.success("创建成功");
        setCreateModalOpen(false);
        actionRef.current?.reload();
      } else {
        message.error("创建失败: " + res.message);
      }
    });
  };

  const onItemEditSubmit = () => {
    setEditModalOpen(false);
    actionRef.current?.reload();
  };

  const handleItemDelete = (id: string) => {
    dictItemDel({ id })
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

  // 字典明细列配置
  const itemColumns: ProColumns<API.DatadictItem>[] = [
    {
      title: "键",
      dataIndex: "k",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true, message: "请输入键" }],
      },
      width: 150,
    },
    {
      title: "值",
      dataIndex: "v",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true, message: "请输入值" }],
      },
      width: 150,
    },
    {
      title: "排序",
      dataIndex: "location",
      valueType: "digit",
      width: 80,
    },
    {
      title: "备注",
      dataIndex: "remark",
      valueType: "text",
      width: 200,
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 120,
      fixed: "right",
      render: (_, record) => [
        <Space key={record.id} wrap>
          <Typography.Link
            onClick={() => {
              setCurrentItem(record);
              setEditModalOpen(true);
            }}
          >
            <EditOutlined /> 修改
          </Typography.Link>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => {
              if (record?.id) {
                handleItemDelete(record.id);
              }
            }}
          >
            <Typography.Link type="danger">
              <DeleteOutlined /> 删除
            </Typography.Link>
          </Popconfirm>
        </Space>,
      ],
    },
  ];

  return (
    <>
      <Card
        title={
          <Space>
            <span>字典明细</span>
            {selectedDict && (
              <Tag color="processing">
                {selectedDict.name} ({selectedDict.category})
              </Tag>
            )}
          </Space>
        }
        extra={
          selectedDict && (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              size="small"
              onClick={() => {
                setCurrentItem(undefined);
                setCreateModalOpen(true);
              }}
            >
              新建明细
            </Button>
          )
        }
        style={{ flex: 1, overflow: "hidden" }}
      >
        {selectedDict ? (
          <ProTable<API.DatadictItem>
            rowKey="id"
            columns={itemColumns}
            actionRef={actionRef}
            cardBordered
            params={{ did: selectedDict?.id }}
            request={async (params) => {
              const res = await dictItemPage({
                pageNum: params.current,
                pageSize: params.pageSize,
                did: selectedDict?.id,
                k: params.k,
                v: params.v,
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
            search={{
              labelWidth: "auto",
            }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
            }}
            dateFormatter="string"
            headerTitle={false}
            toolBarRender={() => []}
          />
        ) : (
          <div style={{ textAlign: "center", color: "#999", padding: 50 }}>
            请选择一个字典分类查看明细
          </div>
        )}
      </Card>

      {/* 新建字典明细弹窗 */}
      <CreateFormModal<API.DatadictItem>
        visible={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSubmit={onItemCreateSubmit}
        columns={itemColumns}
        title="创建字典明细"
        // createApi={dictItemSave}
        successMessage="创建成功"
        loadingMessage="提交中..."
        errorMessage="创建失败"
      />

      {/* 编辑字典明细弹窗 */}
      <EditFormModal<API.DatadictItem>
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSubmit={onItemEditSubmit}
        columns={itemColumns}
        initialValues={currentItem}
        title="更新字典明细"
        updateApi={dictItemUpdate}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />
    </>
  );
}
