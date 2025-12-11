import { Card, Typography } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Welcome = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <SmileOutlined /> 欢迎页面
      </Title>
      <Card>
        <Paragraph>
          这是一个欢迎页面，用于测试 BasicLayout 的路由功能。
        </Paragraph>
        <Paragraph>
          您可以通过左侧菜单导航到不同的页面。
        </Paragraph>
      </Card>
    </div>
  );
};

export default Welcome;