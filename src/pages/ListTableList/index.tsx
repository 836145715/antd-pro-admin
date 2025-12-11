import { Card, Typography, Table, Tag, Space, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ListTableList = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '张三',
      age: 32,
      address: '北京市朝阳区',
      tags: ['开发', '前端'],
    },
    {
      key: '2',
      name: '李四',
      age: 42,
      address: '上海市浦东新区',
      tags: ['设计', 'UI'],
    },
    {
      key: '3',
      name: '王五',
      age: 28,
      address: '广州市天河区',
      tags: ['产品', '经理'],
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>列表页面</Title>

      <Card>
        <Paragraph>
          这是一个数据列表展示页面，包含表格、搜索、筛选等功能。
        </Paragraph>

        <div style={{ marginBottom: '16px' }}>
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>
    </div>
  );
};

export default ListTableList;