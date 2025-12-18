import React, { useState } from "react";
import { ProList } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Switch } from "antd";
import {
  deleteUsingGet,
  activate,
  deactivate,
  pageQuery,
} from "@/api/electronicFenceController";
import CreateModal from "./CreateModal";

interface Props {
  onShowMap: (record: API.ElectronicFence) => void;
}

const FenceList: React.FC<Props> = ({ onShowMap }) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<API.ElectronicFence[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 获取电子围栏列表
  const fetchData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await pageQuery({
        pageNum: current,
        pageSize,
      });
      if (response.success && response.data) {
        setDataSource(response.data.list || []);
        setPagination({
          current: Number(response.data.current || 1),
          pageSize: Number(response.data.size || 10),
          total: Number(response.data.total || 0),
        });
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
      fetchData(pagination.current, pagination.pageSize);
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
      fetchData(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error(checked ? "激活失败" : "停用失败");
    }
  };

  // 处理分页变化
  const handlePageChange = (page: number, pageSize?: number) => {
    fetchData(page, pageSize || pagination.pageSize);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>
          新增围栏
        </Button>
      </div>

      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        <ProList<API.ElectronicFence>
          loading={loading}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: handlePageChange,
            onShowSizeChange: handlePageChange,
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
            size: "small",
          }}
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
              render: (_, record) => <div>123456</div>,
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
      </div>

      <CreateModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={() => {
          fetchData(pagination.current, pagination.pageSize);
          setCreateModalVisible(false);
        }}
      />
    </div>
  );
};

export default FenceList;
