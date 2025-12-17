import React, { useState } from "react";
import { ProList } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Switch } from "antd";
import {
  listAll,
  deleteUsingGet,
  activate,
  deactivate,
} from "@/api/electronicFenceController";
import CreateModal from "./CreateModal";

interface Props {
  onShowMap: (record: API.ElectronicFence) => void;
}

const FenceList: React.FC<Props> = ({ onShowMap }) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<API.ElectronicFence[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // 获取电子围栏列表
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await listAll();
      if (response.success && response.data) {
        setDataSource(response.data);
      }
    } catch (error) {
      message.error("获取列表失败");
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载数据
  React.useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUsingGet({ id });
      message.success("删除成功");
      fetchData();
    } catch (error) {
      message.error("删除失败");
    }
  };

  const handleStatusChange = async (
    checked: boolean,
    record: API.ElectronicFence
  ) => {
    try {
      if (checked) {
        await activate({ id: record.id! });
        message.success("激活成功");
      } else {
        await deactivate({ id: record.id! });
        message.success("停用成功");
      }
      fetchData();
    } catch (error) {
      message.error(checked ? "激活失败" : "停用失败");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>
          新增围栏
        </Button>
      </div>

      <ProList<API.ElectronicFence>
        loading={loading}
        dataSource={dataSource}
        rowKey="id"
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: "name",
            render: (text, record) => (
              <div style={{ fontWeight: 500 }}>
                {text || `围栏 ${record.id}`}
              </div>
            ),
          },
          description: {
            search: false,
            render: (_, record) => (
              <Space>
                <span>状态: {record.status === 1 ? "有效" : "失效"}</span>
                {record.distributorName && (
                  <span>运营商: {record.distributorName}</span>
                )}
                {record.insertTime && <span>创建: {record.insertTime}</span>}
              </Space>
            ),
          },
          actions: {
            render: (_, record) => [
              <Button
                key="showMap"
                type="link"
                size="small"
                onClick={() => onShowMap(record)}
              >
                显示
              </Button>,
              <Popconfirm
                key="delete"
                title="确认删除"
                description="确定要删除这个电子围栏吗？"
                onConfirm={() => handleDelete(record.id!)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" size="small" danger>
                  删除
                </Button>
              </Popconfirm>,
            ],
          },
          subTitle: {
            render: (_, record) => (
              <Switch
                checked={record.status === 1}
                onChange={(checked) => handleStatusChange(checked, record)}
                checkedChildren="启用"
                unCheckedChildren="停用"
              />
            ),
          },
        }}
      />

      <CreateModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={() => {
          fetchData();
          setCreateModalVisible(false);
        }}
      />
    </div>
  );
};

export default FenceList;
