import { menuDel, menuGetTree, menuUpdate } from "@/api/menuController";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Typography, Tree } from "antd";
import { useState, useEffect } from "react";
import type { DataNode } from "antd/es/tree";
import EditFormModal from "@/components/EditFormModal";
import type { ProColumns } from "@ant-design/pro-components";
import { getAllKeys } from "@/utils/menuUtil";

/**
 * 菜单树形结构页面
 */
export default function MenuTree() {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.Menu>();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const loadTreeData = async () => {
    try {
      const res = await menuGetTree();
      if (res.data) {
        const formatData = (menus: API.Menu[]): DataNode[] => {
          return menus.map((menu) => ({
            title: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>
                  {menu.icon && (
                    <span style={{ marginRight: 8 }}>{menu.icon}</span>
                  )}
                  {menu.name}
                  {menu.type === 0 && (
                    <span className="mx-2 text-coolGray">[目录]</span>
                  )}
                  {menu.type === 1 && (
                    <span className="mx-2 text-green-500">[菜单]</span>
                  )}
                  {menu.type === 2 && (
                    <span className="mx-2 text-yellow-500">[按钮]</span>
                  )}
                </span>

                {menu.per ? (
                  <span className="mx-2 text-blue-500">[{menu.per}]</span>
                ) : (
                  ""
                )}

                <Space size="small">
                  <Typography.Link
                    onClick={() => {
                      setCurrentRow(menu);
                      setEditModalOpen(true);
                    }}
                  >
                    <EditOutlined />
                  </Typography.Link>
                  <Popconfirm
                    title="确定删除吗？"
                    onConfirm={() => {
                      if (menu?.id) {
                        handleDelete(menu.id.toString());
                      }
                    }}
                  >
                    <Typography.Link type="danger">
                      <DeleteOutlined />
                    </Typography.Link>
                  </Popconfirm>
                </Space>
              </div>
            ),
            key: menu.id,
            children: menu.children ? formatData(menu.children) : undefined,
          })) as DataNode[];
        };

        const treeData = formatData(res.data);
        setTreeData(treeData);
        setExpandedKeys(getAllKeys(treeData));
      }
    } catch (error: any) {
      message.error("加载菜单树失败: " + error.message);
    }
  };

  useEffect(() => {
    loadTreeData();
  }, []);

  const onEditSubmit = () => {
    setEditModalOpen(false);
    loadTreeData();
  };

  const handleDelete = (id: string) => {
    menuDel({ id })
      .then((res) => {
        if (res.success) {
          message.success("删除成功");
          loadTreeData();
        } else {
          message.error("删除失败: " + res.message);
        }
      })
      .catch((error) => {
        message.error("删除失败: " + error.message);
      });
  };

  const editColumns: ProColumns<API.Menu>[] = [
    {
      title: "路由名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "权限",
      dataIndex: "per",
      key: "per",
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "类型",
      dataIndex: "type",
      valueType: "select",
      fieldProps: {
        options: [
          { label: "目录", value: 0 },
          { label: "菜单", value: 1 },
          { label: "按钮", value: 2 },
        ],
      },
    },
    {
      title: "排序",
      dataIndex: "orderNum",
      valueType: "digit",
    },
  ];

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
  };

  return (
    <>
      <Button className="mb-2" type="primary" onClick={loadTreeData}>
        <ReloadOutlined />
        刷新
      </Button>
      <Tree
        showLine
        treeData={treeData}
        onSelect={(keys) => {
          setSelectedKeys(keys);
        }}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
      />

      <EditFormModal<API.Menu>
        visible={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onSubmit={onEditSubmit}
        columns={editColumns}
        initialValues={currentRow}
        title="更新菜单"
        updateApi={menuUpdate}
        successMessage="更新成功"
        loadingMessage="更新中..."
        errorMessage="更新失败"
      />
    </>
  );
}
