import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Col, Layout, Modal, Spin, Select } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { Line } from '@ant-design/plots';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { countRiskTypes, mergeAndPrepareData, processAnomalyData, processDataDetection, totalDataTypesPerDay, getAnomalyLineColor, getDetectionLineColor, countRiskTypesForPieChart, processAnomalyDataToTime } from '../../hooks/useRiskTypeCount';
import DataTableComponent from '../shared/Datatable/DataTableComponent';
import { detectionDummy } from '../../redux/slices/data/dummyDetections';
import MapComponent from '../shared/Map/MapComponent';
import { anomalyDummy } from '../../redux/slices/data/anomalydummy';
import * as regression from 'regression'; // Add a regression library for linear regression calculations
import { fetchAnomaliesFromAPI } from '../../redux/slices/anomalySlice';
import { fetchDetectionsFromAPI } from '../../redux/slices/detectionSlice';
import PieChartWithPopup from '../charts/PieChart';
import BarChartWithPopup from '../charts/BarChart';
import LineChart from '../charts/LineChart';

const AnalyticsDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>('');

  const anomalyData = useSelector((state: RootState) => state.anomalyData.anomalyData);
  let detectionData = useSelector((state: RootState) => state.detectionData.detectionData);

  const [selectedAnomalyTypes, setSelectedAnomalyTypes] = useState<string[]>(['UnusualBehaviourOutOfBounds', 'UnusualBehaviourRunning']); // Show 2 types by default
  const [selectedDetectionsTypes, setSelectedDetectionsTypes] = useState<string[]>(['UnusualPatternDetection', 'FaceVerificationIdentification']); // Show 2 types by default

  const [statsData, setStatsData] = useState<any>();
  const [tinyAnomalyData, setTinyAnomalyData] = useState<any>();
  const [tinyDataDetection, setTinyDataDetection] = useState<any>();
  const [combinedData, setCombinedData] = useState<any>();
  const [filteredAnomalyData,setFilteredAnomalyData] = useState<any[]>();
  const [filteredDetectionData,setFilteredDetectionData] = useState<any[]>();

  const [trendlineData, setTrendlineData] = useState<any[]>();
  const [trendlineDetectionData, setTrendlineDetectionData] = useState<any[]>();

  const [anomaliesMapData, setanomaliesMapData] = useState<any[]>();
  const [detectionMapData, setdetectionMapData] = useState<any[]>();


  const [combinedAnomalyData, setCombinedAnomalyData] = useState<any[]>();
  const [combinedDetectionData, setCombinedDetectionData] = useState<any[]>();
  const [isOneDateOnly, setIsOneDateOnly] = useState<boolean>(true);
  const [isOneDetectionDateOnly, setIsOneDetectionDateOnly] = useState<boolean>(true);

  const [firstAnomalyDate, setFirstAnomalyDate] = useState<string>("");
  const [firstDetectionDate, setFirstDetectionDate] = useState<string>("");

  const filteredAnomalyDataState = useSelector((state: RootState) => state.anomalyData.filteredData);
  let filteredDetectionDataState = useSelector((state: RootState) => state.detectionData.filteredData);

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
    if (anomalyData && anomalyData[0]) {
      const firstDate = anomalyData[0].datetime.substring(0,10);
      console.log("first date: ",firstDate);
      setFirstAnomalyDate(anomalyData[0].datetime.substring(0,10))
      let isOneDate = true;
      anomalyData.forEach(anomaly =>{
        if (anomaly.datetime.substring(0,10) != firstDate){
          setIsOneDateOnly(false);
          isOneDate = false;
          return;
        }
      })
      const processedAnomalyData = isOneDate? processAnomalyDataToTime(anomalyData) : processAnomalyData(anomalyData);
      setStatsData(processedAnomalyData);
      setTinyAnomalyData(processedAnomalyData);
      console.log("tiny anomaly data1: ", tinyAnomalyData);
      setanomaliesMapData(anomalyData.map(item => 
         item.trackingDetection.geometries[0]));
      // if(anomaliesMapData)
      // setanomaliesMapData(anomaliesMapData.map(item => item.trackingDetection.geometries[0]));
      console.log("anomaliesMapData: ",anomaliesMapData);

    }

    if (detectionData) {
      detectionData= detectionData.filter(detection => detection != null);
      console.log('detection data', detectionData);
      // detectionMapData = detectionData.filter(item => {
      //   if(item)
      //   return item.location;
      // })
      setdetectionMapData(detectionData.map(item => {
        if(item.trackingDetection){
        return item.trackingDetection.geometries[0];}}));

      console.log("detection map data", detectionMapData);

      // const firstDate = detectionMapData[0].datetime.substring(0,10);
      // setFirstDetectionDate(detectionMapData[0].datetime.substring(0,10))
      // let isOneDate = true;
      // detectionMapData.forEach(detection =>{
      //   if (detection.datetime.substring(0,10) != firstDate){
      //     setIsOneDetectionDateOnly(false);
      //     isOneDate = false;
      //     return;
      //   }
      // })
      // const processedDetectionData = isOneDate? processAnomalyDataToTime(detectionData) : processDataDetection(detectionData);
      const processedDetectionData = processDataDetection(detectionData);
      setTinyDataDetection(processedDetectionData);
      console.log("tiny data detection", tinyDataDetection);
      const anomalyTotals = totalDataTypesPerDay(anomalyData);
      const detectionTotals = totalDataTypesPerDay(detectionData);
      setCombinedData(mergeAndPrepareData(anomalyTotals, detectionTotals));
    }
  }, [anomalyData, detectionData]); 


  useEffect(() => {
    if (filteredAnomalyDataState && filteredAnomalyDataState[0]) {
      const firstDate = filteredAnomalyDataState[0].datetime.substring(0,10);
      console.log("first date: ",firstDate);
      setFirstAnomalyDate(filteredAnomalyDataState[0].datetime.substring(0,10))
      let isOneDate = true;
      filteredAnomalyDataState.forEach(anomaly =>{
        if (anomaly.datetime.substring(0,10) != firstDate){
          setIsOneDateOnly(false);
          isOneDate = false;
          return;
        }
      })
      const processedAnomalyData = isOneDate? processAnomalyDataToTime(filteredAnomalyDataState) : processAnomalyData(filteredAnomalyDataState);
      setStatsData(processedAnomalyData);
      setTinyAnomalyData(processedAnomalyData);
      console.log("tiny anomaly data1: ", tinyAnomalyData);
      setanomaliesMapData(filteredAnomalyDataState.map(item => 
         item.trackingDetection.geometries[0]));
    }
  }, [filteredAnomalyDataState]);

  useEffect(() => {
    if (filteredDetectionDataState) {
      filteredDetectionDataState= filteredDetectionDataState.filter(detection => detection != null);
      console.log('filtered detection data', filteredDetectionDataState);
      setdetectionMapData(filteredDetectionDataState.map(item => {
        if(item.trackingDetection){
        return item.trackingDetection.geometries[0];}}));

      console.log("detection map data", detectionMapData);

      const processedDetectionData = processDataDetection(filteredDetectionDataState);
      setTinyDataDetection(processedDetectionData);
      console.log("tiny data detection", tinyDataDetection);
      const anomalyTotals = totalDataTypesPerDay(filteredAnomalyDataState);
      const detectionTotals = totalDataTypesPerDay(filteredDetectionDataState);
      setCombinedData(mergeAndPrepareData(anomalyTotals, detectionTotals));
    }
  }, [filteredDetectionDataState]);

  useEffect(() => {

    setFilteredAnomalyData(Array.isArray(tinyAnomalyData)
    ? tinyAnomalyData.filter(item => selectedAnomalyTypes.includes(item.type))
    : []);
    setTrendlineData(calculateTrendline(Array.isArray(tinyAnomalyData)
    ? tinyAnomalyData.filter(item => selectedAnomalyTypes.includes(item.type))
    : []))
    
  }, [tinyAnomalyData, selectedAnomalyTypes]);
  useEffect(() => {
     setCombinedAnomalyData([...(filteredAnomalyData || []), ...(trendlineData || [])]);
    console.log("combined anomaly data first element: ", [...(filteredAnomalyData || []), ...(trendlineData || [])][0]);
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

//    // Function to calculate trendlines
//    const calculateTrendline = (data: any[]) => {
//     console.log("data inside function: ", data);
//     const groupedData = data.reduce((acc: any, curr: any) => {
//       const type = curr.type || 'Contraband';
// // Manually parse the date in DD-MM-YYYY format
// const [day, month, year] = curr.time.split('-'); // Split the date by "-"
// const time = new Date(Number(year), Number(month) - 1, Number(day)).getTime(); // Convert to timestamp
//   const total = curr.total !== undefined ? Number(curr.total) : NaN; // Ensure total is a number
//         console.log('Processing:', { type, time, total });

//       if (!isNaN(time) && !isNaN(total)) {  // Ensure both time and total are valid numbers
//         if (!acc[type]) {
//           acc[type] = [];
//         }
//         acc[type].push([time, total]);
//       }
//       return acc;
//     }, {});

//     let trendlineData:any[] = [];
//     console.log('grouped data: ', groupedData);
//     Object.keys(groupedData).forEach((type) => {
//       const result = regression.linear(groupedData[type]); // Calculate linear regression
//       result.points.forEach((point) => {
//         const date = new Date(point[0]);
//         // Format the date in European structure (dd-mm-yyyy)
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         const formattedDate = `${day}-${month}-${year}`;
 
//         trendlineData.push({
//           time: formattedDate,
//           total: point[1],
//           type: `${type} (Trend)`,
//         });
//       });
//     });
//     console.log("trendline data inside function: ", trendlineData);
//     return trendlineData;
//   };

// Function to calculate trendlines manually
const calculateTrendline = (data: any[]) => {
  console.log("data inside function: ", data);

  // Group data by type and preprocess it
  const groupedData = data.reduce((acc: any, curr: any) => {
    const type = curr.type || 'Contraband';

    // Manually parse the date in DD-MM-YYYY format
    const [day, month, year] = curr.time.split('-'); // Split the date by "-"
    const time = new Date(Number(year), Number(month) - 1, Number(day)).getTime(); // Convert to timestamp

    const total = curr.total !== undefined ? Number(curr.total) : NaN; // Ensure total is a number

    console.log('Processing:', { type, time, total });

    // Validate both time and total are valid numbers
    if (!isNaN(time) && !isNaN(total)) {
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push([time, total]); // Push [timestamp, total] pairs
    }

    return acc;
  }, {});

  let trendlineData: any[] = [];
  console.log('grouped data: ', groupedData);

  // Calculate trendline for each group
  Object.keys(groupedData).forEach((type) => {
    const points = groupedData[type];

    // Ensure there are enough points for regression
    if (points.length < 2) {
      console.warn(`Not enough data points for type "${type}" to calculate a trendline.`);
      return;
    }

    try {
      // Extract x (time) and y (total) values
      const xValues = points.map((p: any[]) => p[0]);
      const yValues = points.map((p: any[]) => p[1]);

      // Calculate sums for linear regression
      const n = points.length;
      const sumX = xValues.reduce((a: any, b: any) => a + b, 0);
      const sumY = yValues.reduce((a: any, b: any) => a + b, 0);
      const sumXY = points.reduce((a: number, p: number[]) => a + p[0] * p[1], 0);
      const sumX2 = xValues.reduce((a: number, b: number) => a + b * b, 0);

      // Calculate slope (m) and intercept (b)
      const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const b = (sumY - m * sumX) / n;

      // Debugging: Log slope and intercept
      console.log(`Slope (m) for ${type}:`, m);
      console.log(`Intercept (b) for ${type}:`, b);

      // Define two points on the trendline (start and end)
      const minTime = Math.min(...xValues);
      const maxTime = Math.max(...xValues);

      const startPoint = [minTime, m * minTime + b];
      const endPoint = [maxTime, m * maxTime + b];

      // Format these points into the desired structure
      const startFormattedDate = formatDate(new Date(startPoint[0]));
      const endFormattedDate = formatDate(new Date(endPoint[0]));

      trendlineData.push({
        time: startFormattedDate,
      //  total: startPoint[1] + 0.5,
      total: startPoint[1],
        type: `${type} (Trend)`,
      });

      trendlineData.push({
        time: endFormattedDate,
       // total: endPoint[1] + 0.5,
       total: endPoint[1],
        type: `${type} (Trend)`,
      });
    } catch (error) {
      console.error(`Error calculating trendline for type "${type}":`, error);
    }
  });

  console.log("trendline data inside function: ", trendlineData);
  return trendlineData;
};

// Helper function to format dates in dd-mm-yyyy format
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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
      title={isOneDateOnly? "Anomalies Trend for " + firstAnomalyDate : "Anomalies Trend"}
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
      title={isOneDetectionDateOnly? "Detections Trend for " + firstDetectionDate : "Detections Trend"}
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
            value={selectedDetectionsTypes}
            onChange={handleDetectionTypeChange}
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

      <Col span={12}>
          <Card
            title="Anomalies Involved Objects"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomalies Involved Objects', (
                    <BarChartWithPopup anomaliesData={anomalyData}/>
                  ))
                }
              />
            }
          >
                 <BarChartWithPopup anomaliesData={anomalyData}/>

          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="Detections Involved Objects"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Detections Involved Objects', (
                    <BarChartWithPopup anomaliesData={detectionData}/>
                  ))
                }
              />
            }
          >
                 <BarChartWithPopup anomaliesData={anomalyData}/>

          </Card>
        </Col>
        </Row>


        {/* <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
        <Card
            title="Line chart"
          >
          <LineChart/>
          </Card>
        </Col>
      </Row> */}
      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
        <Card
            title="Anomalies Locations"
            extra={anomaliesMapData && anomaliesMapData.length>0 && <FullscreenOutlined onClick={() => openModal('Anomalies Map', <MapComponent locations={anomaliesMapData.map(item => item)} center={[anomaliesMapData[0].geometry.coordinates[0][0],anomaliesMapData[0].geometry.coordinates[0][1]]}  />)} />}
          >
            {anomaliesMapData === undefined && <Spin />}
            {anomaliesMapData && anomaliesMapData.length>0 && <MapComponent key={Math.floor(Math.random() * 9) +Math.floor(100000000)} locations={anomaliesMapData.map(item => item)} center={[anomaliesMapData[0].geometry.coordinates[0][0],anomaliesMapData[0].geometry.coordinates[0][1]]} />}
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
        <Card
            title="Detections Locations"
            extra={detectionMapData && detectionMapData.length>0 &&<FullscreenOutlined onClick={() => openModal('Detection Map', <MapComponent locations={detectionMapData} center={[detectionMapData[0].geometry.coordinates[0][0],detectionMapData[0].geometry.coordinates[0][1]]}  />)} />}
          >
            {detectionData === undefined && <Spin />}
            {detectionMapData && detectionMapData != undefined && detectionMapData.length>0 && <MapComponent key={Math.floor(Math.random() * 9) +Math.floor(100000000)} locations={detectionMapData} center={[detectionMapData[0].geometry.coordinates[0][0],detectionMapData[0].geometry.coordinates[0][1]]} />}
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
