import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Col, Layout, Modal, Spin } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { countRiskTypes, mergeAndPrepareData, processData, processDataDetection, totalDataTypesPerDay } from '../../hooks/useRiskTypeCount';
import DataTableComponent from '../shared/Datatable/DataTableComponent';
import { detectionDummy } from '../../redux/slices/data/dummyDetections';
import MapComponent from '../shared/Map/MapComponent';
import { anomalyDummy } from '../../redux/slices/data/anomalydummy';

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
  let detectionMapData :any[] = [];

  useEffect(() => {
    if (anomalyData) {
      const processedAnomalyData = processData(anomalyData);
      setStatsData(processedAnomalyData);
      setTinyData(processedAnomalyData);
    }

    if (detectionData) {
      detectionMapData = detectionData.filter(item => {
        return item.location;
      })
      const processedDetectionData = processDataDetection(detectionData);
      setTinyDataDetection(processedDetectionData);

      const anomalyTotals = totalDataTypesPerDay(anomalyData);
      const detectionTotals = totalDataTypesPerDay(detectionData);
      setCombinedData(mergeAndPrepareData(anomalyTotals, detectionTotals));
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

  const configPie = useMemo(() => ({
    theme: 'classicDark',
    angleField: 'value',
    colorField: 'labelName',
    legend: true,
  }), []);

  const config = useMemo(() => ({
    theme: 'classicDark',
    xField: 'date',
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: true },
    colorField: 'type',
  }), []);

  return (
    <Layout>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={12}>
          <Card
            title="Filter Anomalies"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Filter Anomalies', (
                    <DataTableComponent
                      data={anomalyDummy}
                      flag="anomaly"
                      fullscreen
                      onRowClick={handleRowClick}
                    />
                  ))
                }
              />
            }
          >
            <DataTableComponent
              data={anomalyDummy}
              flag="anomaly"
              fullscreen={false}
              onRowClick={handleRowClick}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Filter Detections"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Filter Detections', (
                    <DataTableComponent
                      data={detectionDummy}
                      flag="detection"
                      fullscreen
                      onRowClick={handleRowClick}
                    />
                  ))
                }
              />
            }
          >
            <DataTableComponent
              data={detectionDummy}
              flag="detection"
              fullscreen={false}
              onRowClick={handleRowClick}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
          <Card
            title="Anomaly Trend"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomaly Trend', (
                    <Line width={1300} style={{ textAlign: 'center', display: 'flex' }} data={combinedData} {...config} />
                  ))
                }
              />
            }
          >
            {!combinedData ? <Spin /> : <Line width={1300} style={{ textAlign: 'center', display: 'flex' }} data={combinedData} {...config} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={12}>
          <Card
            title="Anomaly Status"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomaly Status', (
                    <Pie width={650} height={500} data={countRiskTypes(tinyData, 'anomalyType')} {...configPie} />
                  ))
                }
              />
            }
          >
            {!tinyData ? <Spin /> : <Pie style={{ textAlign: 'center', display: 'flex' }} width={650} height={500} data={countRiskTypes(tinyData, 'anomalyType')} {...configPie} />}
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="Detection Status"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Detection Status', (
                    <Pie width={650} height={500} data={countRiskTypes(tinyDataDetection, 'detectionType')} {...configPie} />
                  ))
                }
              />
            }
          >
            {!tinyDataDetection ? <Spin /> : <Pie style={{ textAlign: 'center', display: 'flex' }} width={650} height={500} data={countRiskTypes(tinyDataDetection, 'detectionType')} {...configPie} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
        <Card
            title="Detections Location"
            extra={<FullscreenOutlined onClick={() => openModal('Detection Map', <MapComponent locations={detectionMapData.map(item => item.location)} center={undefined}  />)} />}
          >
            {detectionData === undefined && <Spin />}
            {detectionMapData && <MapComponent key={Math.floor(Math.random() * 9) +Math.floor(100000000)} locations={detectionMapData.map(item => item.lcoation)} center={[ 21.8243,39.0742
]} />}
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
        modalRender={(modalContent) => (
          <div style={{ height: '100vh', padding: 0 }}>
            {modalContent}
          </div>
        )}
      >
        {modalContent}
      </Modal>
    </Layout>
  );
};

export default AnalyticsDashboard;
