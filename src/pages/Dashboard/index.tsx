import { Card, Row, Col, Statistic, Progress, Typography } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>仪表盘</Title>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单数量"
              value={93}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="销售额"
              value={112893}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="完成率"
              value={93.2}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<TrophyOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="项目进度" style={{ marginBottom: '16px' }}>
            <Progress percent={30} status="active" />
            <div style={{ marginTop: '16px' }}>
              <p>前端开发: 30%</p>
              <Progress percent={30} showInfo={false} />
            </div>
            <div style={{ marginTop: '16px' }}>
              <p>后端开发: 60%</p>
              <Progress percent={60} showInfo={false} />
            </div>
            <div style={{ marginTop: '16px' }}>
              <p>测试进度: 80%</p>
              <Progress percent={80} showInfo={false} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="性能指标">
            <Progress type="dashboard" percent={75} />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p>CPU 使用率</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;