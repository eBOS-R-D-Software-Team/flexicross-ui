import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Col, Layout, Modal, Spin, Select } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { Line } from '@ant-design/plots';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { countRiskTypes, mergeAndPrepareData, processAnomalyData, processDataDetection, totalDataTypesPerDay, getAnomalyLineColor, getDetectionLineColor, countRiskTypesForPieChart } from '../../hooks/useRiskTypeCount';
import DataTableComponent from '../shared/Datatable/DataTableComponent';
import { detectionDummy } from '../../redux/slices/data/dummyDetections';
import MapComponent from '../shared/Map/MapComponent';
import { anomalyDummy } from '../../redux/slices/data/anomalydummy';
import * as regression from 'regression'; // Add a regression library for linear regression calculations
import { fetchAnomaliesFromAPI } from '../../redux/slices/anomalySlice';
import { fetchDetectionsFromAPI } from '../../redux/slices/detectionSlice';
import PieChartWithPopup from '../charts/PieChart';

const AnalyticsDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>('');

  const anomalyData = useSelector((state: RootState) => state.anomalyData.anomalyData);
  let detectionData = useSelector((state: RootState) => state.detectionData.detectionData);
  const [selectedAnomalyTypes, setSelectedAnomalyTypes] = useState<string[]>(['Contraband', 'Smuggling']); // Show 2 types by default
  const [selectedDetectionsTypes, setSelectedDetectionsTypes] = useState<string[]>(['UnusualPatternDetection', 'FaceVerificationIdentification']); // Show 2 types by default

  const [statsData, setStatsData] = useState<any>();
  const [tinyAnomalyData, setTinyAnomalyData] = useState<any>();
  const [tinyDataDetection, setTinyDataDetection] = useState<any>();
  const [combinedData, setCombinedData] = useState<any>();
  const[filteredAnomalyData,setFilteredAnomalyData] = useState<any[]>();
  const[filteredDetectionData,setFilteredDetectionData] = useState<any[]>();

  const [trendlineData, setTrendlineData] = useState<any[]>();
  const [trendlineDetectionData, setTrendlineDetectionData] = useState<any[]>();

  let detectionMapData :any[] = [];
  const [combinedAnomalyData, setCombinedAnomalyData] = useState<any[]>();
  const [combinedDetectionData, setCombinedDetectionData] = useState<any[]>();

  const handleAnomalyTypeChange = (value: string[]) => {
    setSelectedAnomalyTypes(value);
}
const handleDetectionTypeChange = (value: string[]) => {
  setSelectedDetectionsTypes(value);
}
const dispatch: AppDispatch = useDispatch();

useEffect(() => {
  // Fetch anomalies when the component mounts
  dispatch(fetchAnomaliesFromAPI());
  dispatch(fetchDetectionsFromAPI());

}, [dispatch]);

  useEffect(() => {
    if (anomalyData) {
      const processedAnomalyData = processAnomalyData(anomalyData);
      setStatsData(processedAnomalyData);
      setTinyAnomalyData(processedAnomalyData);
      console.log("tiny anomaly data1: ", tinyAnomalyData);
    }

    if (detectionData) {
      detectionData= detectionData.filter(detection => detection != null);
      console.log('detection data', detectionData);
      detectionMapData = detectionData.filter(item => {
        if(item)
        return item.location;
      })
      console.log("detection map data", detectionMapData);
      const processedDetectionData = processDataDetection(detectionData);
      setTinyDataDetection(processedDetectionData);
      console.log("tiny data detection", tinyDataDetection);
      const anomalyTotals = totalDataTypesPerDay(anomalyData);
      const detectionTotals = totalDataTypesPerDay(detectionData);
      setCombinedData(mergeAndPrepareData(anomalyTotals, detectionTotals));
    }
  }, [anomalyData, detectionData]);

  useEffect(() => {

    setFilteredAnomalyData(Array.isArray(tinyAnomalyData)
    ? tinyAnomalyData.filter(item => selectedAnomalyTypes.includes(item.type))
    : []);
    if(filteredAnomalyData?.length){
    setTrendlineData(calculateTrendline(Array.isArray(tinyAnomalyData)
    ? tinyAnomalyData.filter(item => selectedAnomalyTypes.includes(item.type))
    : []))
  };
    
  }, [tinyAnomalyData, selectedAnomalyTypes]);
  useEffect(() => {
  setCombinedAnomalyData([...(filteredAnomalyData || []), ...(trendlineData || [])]);
    
  }, [filteredAnomalyData, trendlineData]); 

  useEffect(() => {

    setFilteredDetectionData(Array.isArray(tinyDataDetection)
    ? tinyDataDetection.filter(item => selectedDetectionsTypes.includes(item.type))
    : []);
    if(filteredDetectionData?.length){
    setTrendlineDetectionData(calculateTrendline(Array.isArray(tinyDataDetection)
    ? tinyDataDetection.filter(item => selectedDetectionsTypes.includes(item.type))
    : []))
  };
    
  }, [tinyDataDetection, selectedDetectionsTypes]);
  useEffect(() => {
  setCombinedDetectionData([...(filteredDetectionData || []), ...(trendlineDetectionData || [])]);
  console.log("detection data: ",[...(filteredDetectionData || []), ...(trendlineDetectionData || [])]); 
  }, [filteredDetectionData, trendlineDetectionData]); 
  
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
  style: {
    lineWidth: 2,
    textAlign: 'center', display: 'flex',
    lineDash: (items: { type: string; }[]) => {
      const { type } = items[0];
      return type.includes('(Trend)') ? [2, 4] : [0, 0];
    },
    stroke:(items: { type: string; }[]) => {
      const { type } = items[0];
     return getAnomalyLineColor(type);
    },
  },
  interaction: {
    tooltip: {
      render: (e:any, { title, items }: { title:any, items:any }) => {
        const list = items.filter((item: { value: any; }) => item.value);
        return (
          <div key={title}>
            <h4 style={{color: "#808080"}}>{title}</h4>
            {list.map((item: { name: any; value: any; color: any; }) => {
              const { name, value, color } = item;
              return (
                <div>
                  <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', color: "#808080" }}>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: getAnomalyLineColor(name),
                          marginRight: 6,
                        }}
                      ></span>
                      <span>{name}</span>
                    </div>
                    <b>{value}</b>
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
    },
  },
    sizeField: 'total',
   // shapeField: 'trail',
//     legend: { size: true,
//  },
legend:false,
    colorField: 'type',
   
  }), []);
  const detectionsTrendConfig = useMemo(() => ({
    theme: 'classicDark',
    xField: 'time',
    yField: 'total',
  style: {
    lineWidth: 2,
    textAlign: 'center', display: 'flex',
    lineDash: (items: { type: string; }[]) => {
      const { type } = items[0];
      return type.includes('(Trend)') ? [2, 4] : [0, 0];
    },
    stroke:(items: { type: string; }[]) => {
      const { type } = items[0];
      return getDetectionLineColor(type);
    },
  },
  interaction: {
    tooltip: {
      render: (e:any, { title, items }: { title:any, items:any }) => {
        const list = items.filter((item: { value: any; }) => item.value);
        return (
          <div key={title}>
            <h4 style={{color: "#808080"}}>{title}</h4>
            {list.map((item: { name: any; value: any; color: any; }) => {
              const { name, value, color } = item;
              return (
                <div>
                  <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', color: "#808080" }}>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: getDetectionLineColor(name),
                          marginRight: 6,
                        }}
                      ></span>
                      <span>{name}</span>
                    </div>
                    <b>{value}</b>
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
    },
  },
    sizeField: 'total',
   // shapeField: 'trail',
//     legend: { size: true,
//  },
legend: false,
    colorField: 'type',
   
  }), []);

  // Generate options for the Select anomaly component
  const options = Array.from(new Set(tinyAnomalyData?.map((item: { type: any; ids:string[] }) => item.type))).map(type => ({
    label: type,
    value: type
  }));

   // Generate options for the Select detection component
   const detectionOptions = Array.from(new Set(tinyDataDetection?.map((item: { type: any; }) => item.type))).map(type => ({
    label: type,
    value: type,
  }));

   // Function to calculate trendlines
   const calculateTrendline = (data: any[]) => {
    console.log("data inside function: ", data);
    const groupedData = data.reduce((acc: any, curr: any) => {
      const type = curr.type || 'Contraband';
// Manually parse the date in DD-MM-YYYY format
const [day, month, year] = curr.time.split('-'); // Split the date by "-"
const time = new Date(Number(year), Number(month) - 1, Number(day)).getTime(); // Convert to timestamp
  const total = curr.total !== undefined ? Number(curr.total) : NaN; // Ensure total is a number
        console.log('Processing:', { type, time, total });

      if (!isNaN(time) && !isNaN(total)) {  // Ensure both time and total are valid numbers
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push([time, total]);
      }
      return acc;
    }, {});

    let trendlineData:any[] = [];
    console.log('grouped data: ', groupedData);
    Object.keys(groupedData).forEach((type) => {
      const result = regression.linear(groupedData[type]); // Calculate linear regression
      result.points.forEach((point) => {
        const date = new Date(point[0]);
        // Format the date in European structure (dd-mm-yyyy)
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
 
        trendlineData.push({
          time: formattedDate,
          total: point[1],
          type: `${type} (Trend)`,
        });
      });
    });
    console.log("trendline data inside function: ", trendlineData);
    return trendlineData;
  };

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
                      data={anomalyData}
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
              data={anomalyData}
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
                      data={detectionData}
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
              data={detectionData}
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
                <Line width={1300} data={combinedAnomalyData?combinedAnomalyData.sort():combinedAnomalyData} {...anomaliesTrendConfig} />
                </div>
              ))
            }
          />
        </>
      }
    >
      {!tinyAnomalyData ? <Spin /> : <Line width={1300}  data={combinedAnomalyData?combinedAnomalyData.sort():combinedAnomalyData} {...anomaliesTrendConfig} />}
    </Card>
    <Card
      title="Detections Trend"
      extra={
        <>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '600px', marginRight: '16px' }}
            placeholder="Select detection types"
            value={selectedDetectionsTypes}
            onChange={handleDetectionTypeChange}
            options={detectionOptions} // Use the options array here
          />

          <FullscreenOutlined
            onClick={() =>
              openModal('Detections Trend', (
                <div>
                   <Select
            mode="multiple"
            allowClear
            style={{ width: '600px', marginRight: '16px' }}
            placeholder="Select anomaly types"
            value={selectedAnomalyTypes}
            onChange={handleAnomalyTypeChange}
            options={detectionOptions} // Use the options array here
          />
                <Line width={1300} data={combinedDetectionData} {...detectionsTrendConfig} />
                </div>
              ))
            }
          />
        </>
      }
    >
      {!tinyDataDetection ? <Spin /> : <Line width={1300}  data={combinedDetectionData} {...detectionsTrendConfig} />}
    </Card>
          <Card
            title="Anomalies and detections graph"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomalies and detections graph', (
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
            title="Anomalies Distribution"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomalies Distribution', (
                    <PieChartWithPopup data={tinyAnomalyData} type={"anomalyType"}/>
                  ))
                }
              />
            }
          >
                 <PieChartWithPopup  data={tinyAnomalyData} type={"anomalyType"}/>

          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="Detections Distribution"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomalies Distribution', (
                    <PieChartWithPopup data={tinyDataDetection} type={"detectionType"}/>
                  ))
                }
              />
            }
          >
                 <PieChartWithPopup  data={tinyDataDetection} type={"detectionType"}/>

          </Card>
        </Col>

        {/* <Col span={12}>
          <Card
            title="Anomalies Distribution"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomalies Distribution', (
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
            title="Detections Distribution"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Detections Distribution', (
                    <Pie width={650} height={500} data={countRiskTypes(tinyDataDetection, 'detectionType')} {...configPie} />
                  ))
                }
              />
            }
          >
            {!tinyDataDetection ? <Spin /> : <Pie style={{ textAlign: 'center', display: 'flex' }} width={650} height={500} data={countRiskTypes(tinyDataDetection, 'detectionType')} {...configPie} />}
          </Card>
        </Col> */}
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
