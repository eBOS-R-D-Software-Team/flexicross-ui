import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import DataTableComponent from '../../components/shared/Datatable/DataTableComponent';
import { fetchAnomaliesFromAPI } from '../../redux/slices/anomalySlice';
import { fetchDetectionsFromAPI } from '../../redux/slices/detectionSlice';
import { addVisualDashboard } from '../../redux/slices/visualDashboardSlice';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

const CreateVisualDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate  = useNavigate();

  // pull the live arrays from the store
  const anomalyData   = useSelector((s: RootState) => s.anomalyData.anomalyData);
  const detectionData = useSelector((s: RootState) => s.detectionData.detectionData);

  // we’ll also tap into the *filtered* arrays that DataTableComponent updates
  const filteredAnomalies   = useSelector((s: RootState) => s.anomalyData.filteredData);
  const filteredDetections  = useSelector((s: RootState) => s.detectionData.filteredData);

  // fetch once
  useEffect(() => {
    dispatch(fetchAnomaliesFromAPI());
    dispatch(fetchDetectionsFromAPI());
  }, [dispatch]);

  const handleGenerateDashboard = () => {
    const id  = uuid().slice(0, 8);
    const now = new Date().toISOString();

    dispatch(
      addVisualDashboard({
        id,
        datetime: now,
        data: [
          ...filteredAnomalies,  // or anomalyData if you’d rather ignore filters
          ...filteredDetections,
        ],
        filters: {},            // save current filter params if you want
      }),
    );

    navigate('/visual/view-dashboards');
  };

  return (
    <Layout style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <DataTableComponent
            data={anomalyData}
            flag="anomaly"
            fullscreen={false}
          />
        </Col>
        <Col xs={24} lg={12}>
          <DataTableComponent
            data={detectionData}
            flag="detection"
            fullscreen={false}
          />
        </Col>
      </Row>

      <Space style={{ marginTop: 24 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleGenerateDashboard}
        >
          Generate Dashboard
        </Button>
      </Space>
    </Layout>
  );
};

export default CreateVisualDashboard;
