import { Card, Typography, Alert, List } from 'antd';
import { CrownOutlined, SafetyOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Admin = () => {
  const adminFeatures = [
    {
      icon: <SafetyOutlined />,
      title: '权限管理',
      description: '管理系统用户权限和角色'
    },
    {
      icon: <SettingOutlined />,
      title: '系统设置',
      description: '配置系统参数和全局设置'
    },
    {
      icon: <CrownOutlined />,
      title: '超级管理员',
      description: '拥有系统所有权限'
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <CrownOutlined /> 管理页面
      </Title>

      <Alert
        message="管理员专属页面"
        description="此页面仅管理员可见，需要相应的访问权限。"
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card title="管理功能" style={{ marginBottom: '24px' }}>
        <Paragraph>
          这是管理主页面，包含系统的核心管理功能。
        </Paragraph>
        <List
          itemLayout="horizontal"
          dataSource={adminFeatures}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.icon}
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

export default Admin;