import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Col, Layout, Modal, Spin, Select } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { countRiskTypes, mergeAndPrepareData, processAnomalyData, processDataDetection, totalDataTypesPerDay } from '../../hooks/useRiskTypeCount';
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
  const [selectedAnomalyTypes, setSelectedAnomalyTypes] = useState<string[]>(['Contraband', 'Smuggling']); // Show 2 types by default
  const [statsData, setStatsData] = useState<any>();
  const [tinyAnomalyData, setTinyAnomalyData] = useState<any>();
  const [tinyDataDetection, setTinyDataDetection] = useState<any>();
  const [combinedData, setCombinedData] = useState<any>();
  let detectionMapData :any[] = [];

  const handleAnomalyTypeChange = (value: string[]) => {
    setSelectedAnomalyTypes(value);
  };

  useEffect(() => {
    if (anomalyData) {
      const processedAnomalyData = processAnomalyData(anomalyData);
      setStatsData(processedAnomalyData);
      setTinyAnomalyData(processedAnomalyData);
      console.log("precessed anomaly data: ", processedAnomalyData );
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
      console.log("anomaly data: ", anomalyData);
      console.log("combined data: ", combinedData);
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

  const anomaliesTrendConfig = useMemo(() => ({
    theme: 'classicDark',
    xField: 'time',
    yField: 'total',
    sizeField: 'total',
    shapeField: 'trail',
    legend: { size: true },
    colorField: 'type',
  }), []);

  // Filter the data to only show the selected types
  const filteredAnomalyData = useMemo(() => {
    return tinyAnomalyData?.filter((item: { type: string; }) => selectedAnomalyTypes.includes(item.type));
  }, [tinyAnomalyData, selectedAnomalyTypes]);

  // Generate options for the Select component
  const options = Array.from(new Set(tinyAnomalyData?.map((item: { type: any; }) => item.type))).map(type => ({
    label: type,
    value: type,
  }));

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
      title="Anomalies Trend"
      extra={
        <>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '600px', marginRight: '16px' }}
            placeholder="Select anomaly types"
            value={selectedAnomalyTypes}
            onChange={handleAnomalyTypeChange}
            options={options} // Use the options array here
          />

          <FullscreenOutlined
            onClick={() =>
              openModal('Anomalies Trend', (
                <div>
                   <Select
            mode="multiple"
            allowClear
            style={{ width: '600px', marginRight: '16px' }}
            placeholder="Select anomaly types"
            value={selectedAnomalyTypes}
            onChange={handleAnomalyTypeChange}
            options={options} // Use the options array here
          />
                <Line width={1300} style={{ textAlign: 'center', display: 'flex' }} data={filteredAnomalyData} {...anomaliesTrendConfig} />
                </div>
              ))
            }
          />
        </>
      }
    >
      {!tinyAnomalyData ? <Spin /> : <Line width={1300} style={{ textAlign: 'center', display: 'flex' }} data={filteredAnomalyData} {...anomaliesTrendConfig} />}
    </Card>
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
                    <Pie width={650} height={500} data={countRiskTypes(tinyAnomalyData, 'anomalyType')} {...configPie} />
                  ))
                }
              />
            }
          >
            {!tinyAnomalyData ? <Spin /> : <Pie style={{ textAlign: 'center', display: 'flex' }} width={650} height={500} data={countRiskTypes(tinyAnomalyData, 'anomalyType')} {...configPie} />}
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
