import {
  dictPage,
  dictSave,
  dictUpdate,
  dictDel,
} from "@/api/datadictController";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Typography,
  Card,
  List,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";

interface DictListProps {
  selectedDict?: API.Datadict;
  onSelectDict: (dict: API.Datadict) => void;
}

export default function DictList({
  selectedDict,
  onSelectDict,
}: DictListProps) {
  const [dictList, setDictList] = useState<API.Datadict[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentDict, setCurrentDict] = useState<API.Datadict>();

  // 加载字典列表
  const loadDictList = async () => {
    try {
      const res = await dictPage({
        pageNum: 1,
        pageSize: 100,
      });
      if (res.success && res.data) {
        const list = res.data.list || [];
        setDictList(list);
        // 默认选中第一个
        if (list.length > 0 && !selectedDict) {
          onSelectDict(list[0]);
        }
      }
    } catch (error) {
      message.error("加载字典列表失败");
    }
  };

  useEffect(() => {
    loadDictList();
  }, []);

  // 字典主表操作
  const onCreateSubmit = () => {
    setCreateModalOpen(false);
    loadDictList();
  };

  const onEditSubmit = () => {
    setEditModalOpen(false);
    loadDictList();
  };

  const handleDelete = (id: string) => {
    dictDel({ id })
      .then((res) => {
        if (res.success) {
          message.success("删除成功");
          loadDictList();
          if (selectedDict?.id === id) {
            onSelectDict({} as API.Datadict);
          }
        } else {
          message.error("删除失败: " + res.message);
        }
      })
      .catch((error) => {
        message.error("删除失败: " + error.message);
      });
  };

  // 字典列配置（用于表单）
  const dictColumns: ProColumns<API.Datadict>[] = [
    {
      title: "分类",
      dataIndex: "category",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true, message: "请输入分类" }],
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      valueType: "text",
      formItemProps: {
        rules: [{ required: true, message: "请输入名称" }],
      },
    },
    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "text",
      copyable: true,
    },
  ];

  return (
    <>
      <Card
        title={
          <Space>
            <AppstoreOutlined />
            <span>字典分类</span>
          </Space>
        }
        extra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            size="small"
            onClick={() => setCreateModalOpen(true)}
          >
            新建
          </Button>
        }
        style={{ width: 300, overflow: "auto" }}
        bodyStyle={{ padding: 0 }}
      >
        <List
          dataSource={dictList}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                background:
                  selectedDict?.id === item.id ? "#e6f7ff" : "transparent",
                borderLeft:
                  selectedDict?.id === item.id
                    ? "3px solid #1890ff"
                    : "3px solid transparent",
              }}
              onClick={() => onSelectDict(item)}
              actions={[
                <Typography.Link
                  key="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentDict(item);
                    setTimeout(() => setEditModalOpen(true), 0);
                  }}
                >
                  <EditOutlined />
                </Typography.Link>,
                <Popconfirm
                  key="delete"
                  title="确定删除吗？"
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    if (item?.id) {
                      handleDelete(item.id);
                    }
                  }}
                >
                  <Typography.Link
                    type="danger"
                    onClick={(e) => e?.stopPropagation()}
                  >
                    <DeleteOutlined />
                  </Typography.Link>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Tag color="blue">{item.category}</Tag>
                    <span>{item.name}</span>
                  </Space>
                }
                description={
                  <Typography.Text copyable>
                    {item.remarks || "暂无备注"}
                  </Typography.Text>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* 新建字典弹窗 */}
      <CreateFormModal<API.Datadict>
        visible={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSubmit={onCreateSubmit}
        columns={dictColumns}
        title="创建字典"
        createApi={dictSave}
        successMessage="创建成功"
        loadingMessage="提交中..."
        errorMessage="创建失败"
      />

      {/* 编辑字典弹窗 */}
      <EditFormModal<API.Datadict>
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSubmit={onEditSubmit}
        columns={dictColumns}
        initialValues={currentDict}
        title="更新字典"
        updateApi={dictUpdate}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />
    </>
  );
}
