import { Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminSubPage1 = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>
        <UserOutlined /> 管理一级页面
      </Title>
      <Card>
        <p>这是管理模块的一级页面，可以用于用户管理等具体功能。</p>
      </Card>
    </div>
  );
};

export default AdminSubPage1;