import { Card, Typography, List, Avatar } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ListSubSubPage1 = () => {
  const listData = [
    {
      title: '文章标题 1',
      description: '这是文章的详细描述，包含了文章的主要内容和摘要信息。',
      avatar: <FileTextOutlined />,
    },
    {
      title: '文章标题 2',
      description: '这是另一篇文章的详细描述，展示了不同的内容结构。',
      avatar: <FileTextOutlined />,
    },
    {
      title: '文章标题 3',
      description: '第三篇文章的描述，可以包含更多的元数据和相关信息。',
      avatar: <FileTextOutlined />,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={4}>一级列表页面</Title>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={item.avatar} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ListSubSubPage1;