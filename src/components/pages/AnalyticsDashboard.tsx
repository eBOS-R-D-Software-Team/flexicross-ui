import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Modal, Spin } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { DualAxes, Line, Pie } from '@ant-design/charts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { countRiskTypes, mergeAndPrepareData, processData, processDataDetection, totalDataTypesPerDay } from '../../hooks/useRiskTypeCount';
import DataTableComponent from '../shared/Datatable/DataTableComponent';
import { detectionDummy } from '../../redux/slices/data/dummyDetections';
import MapComponent from '../shared/Map/MapComponent';
import { anomalyDummy } from '../../redux/slices/data/anomalydummy';

const pieConfig = {
  theme: "classicDark",
  angleField: 'value',
  colorField: 'labelName',
  legend: true,
};

const lineConfig = {
  theme: "classicDark",
  xField: 'date',
  yField: 'value',
  sizeField: 'value',
  shapeField: 'trail',
  legend: { size: true },
  colorField: 'type',
};

const AnalyticsDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>('');
  const dispatch = useDispatch();
  const anomalyData = useSelector((state: RootState) => state.anomalyData.anomalyData);
  const detectionData = useSelector((state: RootState) => state.detectionData.detectionData);
  
  const [statsData, setStatsData] = useState<any>();
  const [tinyData, setTinyData] = useState<any>();
  const [tinyDataDetection, setTinyDataDetection] = useState<any>();
  const [combinedData, setCombinedData] = useState<any>();
  const [detectionMapData, setDetectionMapData] = useState<any[]>([]);

  useEffect(() => {
    if (anomalyData) {
      setStatsData(processData(anomalyData));
      setTinyData(processData(anomalyData));
    }

    if (detectionData) {
      const filteredDetectionData = detectionData.filter(item => item.location);
      setDetectionMapData(filteredDetectionData);
      setTinyDataDetection(processDataDetection(detectionData));
      setCombinedData(mergeAndPrepareData(totalDataTypesPerDay(anomalyData), totalDataTypesPerDay(detectionData)));
    }
  }, [anomalyData, detectionData]);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
  };

  const handleRowClick = (record: any) => {
    openModal('Details', <div>{JSON.stringify(record.involvedObjects, null, 2)}</div>);
  };

  const handleActionClick = (record: any) => {
    openModal('Details', <div>{JSON.stringify(record.involvedObjects, null, 2)}</div>);
  };

  const renderDataTable = (data: any, flag: string) => (
    <DataTableComponent
      data={data}
      flag={flag}
      fullscreen={false}
      onRowClick={handleRowClick}
      onActionClick={handleActionClick}
    />
  );

  return (
    <Layout>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={12}>
          <Card
            title="Filter Anomalies"
            extra={<FullscreenOutlined onClick={() => openModal('Filter Anomalies', renderDataTable(anomalyDummy, 'anomaly'))} />}
          >
            {renderDataTable(anomalyDummy, 'anomaly')}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Filter Detections"
            extra={<FullscreenOutlined onClick={() => openModal('Filter Detections', renderDataTable(detectionDummy, 'detection'))} />}
          >
            {renderDataTable(detectionDummy, 'detection')}
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
          <Card
            title="Anomaly Trend"
            extra={<FullscreenOutlined onClick={() => openModal('Anomaly Trend', <Line width={1300} style={{ textAlign: 'center' }} data={combinedData} {...lineConfig} />)} />}
          >
            {combinedData ? <Line width={1300} style={{ textAlign: 'center' }} data={combinedData} {...lineConfig} /> : <Spin />}
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={12}>
          <Card
            title="Anomaly Status"
            extra={<FullscreenOutlined onClick={() => openModal('Anomaly Status', <Pie width={650} height={500} data={countRiskTypes(tinyData, 'anomalyType')} {...pieConfig} />)} />}
          >
            {tinyData ? <Pie width={650} height={500} data={countRiskTypes(tinyData, 'anomalyType')} {...pieConfig} /> : <Spin />}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Detection Status"
            extra={<FullscreenOutlined onClick={() => openModal('Detection Status', <Pie width={650} height={500} data={countRiskTypes(tinyDataDetection, 'detectionType')} {...pieConfig} />)} />}
          >
            {tinyDataDetection ? <Pie width={650} height={500} data={countRiskTypes(tinyDataDetection, 'detectionType')} {...pieConfig} /> : <Spin />}
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
          <Card
            title="Detections Location"
            extra={<FullscreenOutlined onClick={() => openModal('Detection Map', <MapComponent locations={detectionMapData.map(item => item.location)} center={[21.8243, 39.0742]} />)} />}
          >
            {detectionMapData.length ? <MapComponent locations={detectionMapData.map(item => item.location)} center={[21.8243, 39.0742]} /> : <Spin />}
          </Card>
        </Col>
      </Row>

      <Modal
        title={modalTitle}
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width="100%"
        style={{ top: 0 }}
        modalRender={(modalContent) => <div style={{ height: '100vh', padding: 0 }}>{modalContent}</div>}
      >
        {modalContent}
      </Modal>
    </Layout>
  );
};

export default AnalyticsDashboard;
