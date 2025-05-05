import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { Card, Layout, Row, Col, Tag, Button, Space } from 'antd';
import { clearVisualDashboards } from '../../redux/slices/visualDashboardSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const ViewVisualDashboards: React.FC = () => {
  const dashboards = useSelector(
    (s: RootState) => s.visualDashboardData.dashboards,
  );
  const dispatch  = useDispatch<AppDispatch>();
  const navigate   = useNavigate();

  return (
    <Layout style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="default" onClick={() => navigate('/visual/create-dashboard')}>
          Add Dashboard
        </Button>
        <Button danger onClick={() => dispatch(clearVisualDashboards())}>
          Clear Data
        </Button>
      </Space>

      <Row gutter={[16, 16]}>
        {dashboards.map(d => (
          <Col xs={24} lg={8} key={d.id}>
            <Card
              hoverable
              onClick={() => navigate(`/visual/dashboard/${d.id}`)}
            >
              <h4 style={{ marginBottom: 8 }}>Dashboard {d.id}</h4>
              <Tag color="blue">{dayjs(d.datetime).format('DD MMM, HH:mm')}</Tag>
              <div style={{ marginTop: 12 }}>
                <strong>Type:</strong> Visual
              </div>
            </Card>
          </Col>
        ))}
        {dashboards.length === 0 && (
          <Col span={24}>
            <Card>No visual-analytics dashboards yet. Create one!</Card>
          </Col>
        )}
      </Row>
    </Layout>
  );
};

export default ViewVisualDashboards;
