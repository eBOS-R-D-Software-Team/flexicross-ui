import React, { useEffect, useState, useMemo } from 'react';
import { Card, Row, Col, Layout, Modal, Spin, Select } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { Line } from '@ant-design/plots';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { countRiskTypes, mergeAndPrepareData, processAnomalyData, processDataDetection, totalDataTypesPerDay, getAnomalyLineColor, getDetectionLineColor, countRiskTypesForPieChart, processAnomalyDataToTime, formatDateTime, processDataDetectionToTime } from '../../hooks/useRiskTypeCount';
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

  const [anomalyDistribution, setAnomalyDistribution] = useState<any[]>();
  const [detectionDistribution, setdetectionDistribution] = useState<any[]>();

  const filteredAnomalyDataState = useSelector((state: RootState) => state.anomalyData.filteredData);
  let filteredDetectionDataState = useSelector((state: RootState) => state.detectionData.filteredData);

  const [isAnomalyModalVisible, setIsAnomalyModalVisible] = useState(false);
const [selectedAnpmalyDayData, setSelectedAnpmalyDayData] = useState<any[]>([]);
const [isDetectionModalVisible, setIsDetectionModalVisible] = useState(false);
const [selectedDetectionDayData, setSelectedDetectionDayData] = useState<any[]>([]);
const userGroup = localStorage.getItem("usergroup") || 'khra';
const isBeiaEvent = userGroup == 'uc1_beia' ||  userGroup == 'uc3_beia';
const isWings = userGroup == 'uc2_wings';
const isIccs = userGroup == 'uc1_iccs';
const [selectedAnomalyTypes, setSelectedAnomalyTypes] = useState<string[]>(userGroup == 'uc3_beia' ? ['ClandestineMigrant', 'PersonMisIdentification']: userGroup == 'uc1_beia' ? ['ClandestineMigrant', 'HumanTrafficking']: userGroup == 'uc2_wings' ? ['Smuggling', 'HumanTrafficking']: userGroup == 'uc1_iccs' ? ['PersonOutOfBounds', 'PersonMisIdentification'] : ['UnusualBehaviourOutOfBounds', 'UnusualBehaviourRunning']); // Show 2 types by default
const [selectedDetectionsTypes, setSelectedDetectionsTypes] = useState<string[]>( userGroup == 'uc3_beia' ? ['PersonIdentification', 'TrainRecognition']: userGroup == 'uc2_wings' ? ['NormalDrivingPattern'] :  userGroup == 'uc1_iccs' ? ['PersonPattern', 'PersonIdentification'] : ['UnusualPatternDetection', 'FaceVerificationIdentification']); // Show 2 types by default

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
      // Separate the ones we want to remove
const removedItems = anomalyData.filter(item => !item.trackingDetection && userGroup !== 'uc2_wings');

// Keep only the ones we want to keep
const filteredDatahere = anomalyData.filter(item => item.trackingDetection || userGroup === 'uc2_wings');

// Now do the mapping
setanomaliesMapData(
  filteredDatahere.map(item => {
    if (item.trackingDetection) {
      return item.trackingDetection.geometries[0];
    } else {
      return item.location; // userGroup is 'uc2_wings' at this point
    }
  })
);

      // setanomaliesMapData(
      //   anomalyData
      //     .map(item => {
      //       if (item.trackingDetection) {
      //         console.log("el cas loul");

      //         return item.trackingDetection.geometries[0];
      //       } else if (userGroup === 'uc2_wings') {
      //         return item.location;
      //       } else {
      //         console.log("el cas theleth");

      //         return null; // Remove from array if no trackingDetection and not uc2_wings
      //       }
      //     })
      //     .filter(Boolean) // Removes null (or undefined) values
      // );
      //       // if(anomaliesMapData)
      // // setanomaliesMapData(anomaliesMapData.map(item => item.trackingDetection.geometries[0]));
      // console.log("anomaliesMapData: ",anomaliesMapData);

    }

    if (detectionData && detectionData.length) {
      detectionData= detectionData.filter(detection => detection != null);
      console.log('detection data', detectionData);
      
      const firstDetectionDate = detectionData[0].datetime.substring(0,10);
      console.log("first date: ",firstDetectionDate);
      setFirstDetectionDate(detectionData[0].datetime.substring(0,10))
      let isOneDetectionDate = true;
      detectionData.forEach(anomaly =>{
        if (anomaly.datetime.substring(0,10) != firstDetectionDate){
          setIsOneDetectionDateOnly(false);
          isOneDetectionDate = false;
          return;
        }
      })

      // detectionMapData = detectionData.filter(item => {
      //   if(item)
      //   return item.location;
      // })
      setdetectionMapData(detectionData.map(item => {
        if(item.trackingDetection){
        return item.trackingDetection.geometries[0];}
        else if (userGroup == 'uc2_wings') return item.location

        
      }));

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
       const processedDetectionData = isOneDetectionDate? processDataDetectionToTime(detectionData) : processDataDetection(detectionData);
     // const processedDetectionData = processDataDetection(detectionData);
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
      // Separate the ones we want to remove
      const removedItems = anomalyData.filter(item => !item.trackingDetection && userGroup !== 'uc2_wings');

      // Keep only the ones we want to keep
      const filteredDatahere = anomalyData.filter(item => item.trackingDetection || userGroup === 'uc2_wings');
      
      // Now do the mapping
      setanomaliesMapData(
        filteredDatahere.map(item => {
          if (item.trackingDetection) {
            return item.trackingDetection.geometries[0];
          } else {
            return item.location; // userGroup is 'uc2_wings' at this point
          }
        })
      );
      
      
         
    }
  }, [filteredAnomalyDataState]);

  useEffect(() => {

   console.log("anomalies map data tbadlet w walet: ", anomaliesMapData);  
  }, [anomaliesMapData]);


  useEffect(() => {
    if (filteredDetectionDataState) {
      filteredDetectionDataState= filteredDetectionDataState.filter(detection => detection != null);
      console.log('filtered detection data', filteredDetectionDataState);
      if (filteredDetectionDataState[0]){
      const firstDetectionDate = filteredDetectionDataState[0].datetime.substring(0,10);
      setFirstDetectionDate(filteredDetectionDataState[0].datetime.substring(0,10))}
      let isOneDetectionDate = true;
      filteredDetectionDataState.forEach(anomaly =>{
        if (anomaly.datetime.substring(0,10) != firstDetectionDate){
          setIsOneDateOnly(false);
          isOneDetectionDate = false;
          return;
        }
      })

      setdetectionMapData(filteredDetectionDataState.map(item => {
        if(item.trackingDetection){
          return item.trackingDetection.geometries[0];}
          else if (userGroup == 'uc2_wings') return item.location

    }));

      console.log("detection map data", detectionMapData);
      const processedDetectionData = isOneDetectionDate? processDataDetectionToTime(detectionData) : processDataDetection(detectionData);

   //   const processedDetectionData = processDataDetection(filteredDetectionDataState);
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

    setAnomalyDistribution(tinyAnomalyData);    
  }, [tinyAnomalyData, selectedAnomalyTypes]);

// Helper function to parse a date string in 'dd-mm-yyyy' format.
function parseDateString(dateStr: string): Date {
  const [day, month, year] = dateStr.split('-').map(Number);
  // Note: month is 0-indexed in JavaScript Date.
  return new Date(year, month - 1, day);
}
useEffect(() => {
  // Create a copy of filteredAnomalyData to process.
  const processedFilteredData = [...(filteredAnomalyData || [])];

  // Extract all unique date strings from filteredAnomalyData.
  const uniqueDatesSet = new Set(processedFilteredData.map(item => item.time));
  const uniqueDates = Array.from(uniqueDatesSet);

  // Convert these date strings to Date objects.
  const dateObjects = uniqueDates.map(dateStr => parseDateString(dateStr));
  const minDate = new Date(Math.min(...dateObjects.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dateObjects.map(d => d.getTime())));

  // Generate a full range of dates (in 'dd-mm-yyyy') from minDate to maxDate.
  const fullDateRange = getDatesBetween(minDate, maxDate);

  // Extract all unique anomaly types from filteredAnomalyData.
  const uniqueTypes = Array.from(new Set(processedFilteredData.map(item => item.type)));

  // For each day in the full date range and for each anomaly type,
  // if a record does not exist for that day/type, add one with total: 0.
  fullDateRange.forEach(dateStr => {
    uniqueTypes.forEach(type => {
      const exists = processedFilteredData.some(item => item.time === dateStr && item.type === type);
      if (!exists) {
        processedFilteredData.push({ time: dateStr, type, total: 0 });
      }
    });
  });

  // Combine the processed filtered data with trendlineData.
  let combined = [
    ...processedFilteredData,
    ...(trendlineData || [])
  ];

  // Sort the combined array by date.
  combined = combined.sort(
    (a, b) => parseDateString(a.time).getTime() - parseDateString(b.time).getTime()
  );

  // Update state with the sorted, combined anomaly data.
  setCombinedAnomalyData(combined);
  console.log("Combined anomaly data:", combined);
}, [filteredAnomalyData, trendlineData]);


  useEffect(() => {

    setFilteredDetectionData(Array.isArray(tinyDataDetection)
    ? tinyDataDetection.filter(item => selectedDetectionsTypes.includes(item.type))
    : []);
    if(filteredDetectionData?.length){
    setTrendlineDetectionData(calculateTrendline(Array.isArray(tinyDataDetection)
    ? tinyDataDetection.filter(item => selectedDetectionsTypes.includes(item.type))
    : []))

    setdetectionDistribution(tinyDataDetection);    

  };
    
  }, [tinyDataDetection, selectedDetectionsTypes]);

  useEffect(() => {

    console.log("anomaly distribution walet: ", anomalyDistribution);
    
  }, [detectionDistribution, anomalyDistribution]);

  
// Helper: format a Date object into 'dd-mm-yyyy'.
function formatDateForTotalZero(date: Date): string {
  const dd = date.getDate();
  const mm = date.getMonth() + 1; // JavaScript months are 0-indexed.
  const yyyy = date.getFullYear();
  const ddStr = dd < 10 ? `0${dd}` : `${dd}`;
  const mmStr = mm < 10 ? `0${mm}` : `${mm}`;
  return `${ddStr}-${mmStr}-${yyyy}`;
}

// Helper: generate all dates (as 'dd-mm-yyyy' strings) between two Date objects (inclusive).
function getDatesBetween(startDate: Date, endDate: Date): string[] {
  const dates = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    dates.push(formatDateForTotalZero(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}


useEffect(() => {
  // Copy filteredDetectionData to avoid mutating the original.
  const processedFilteredData = [...(filteredDetectionData || [])];

  // Get the unique dates present in filteredDetectionData.
  const uniqueDatesSet = new Set(processedFilteredData.map(item => item.time));
  const uniqueDates = Array.from(uniqueDatesSet);
  
  // Convert date strings to Date objects.
  const dateObjects = uniqueDates.map(dateStr => parseDateString(dateStr));
  const minDate = new Date(Math.min(...dateObjects.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...dateObjects.map(d => d.getTime())));
  
  // Generate the full range of dates (as 'dd-mm-yyyy') from minDate to maxDate.
  const fullDateRange = getDatesBetween(minDate, maxDate);
  
  // Get the unique detection types from filteredDetectionData.
  const uniqueTypes = Array.from(new Set(processedFilteredData.map(item => item.type)));
  
  // For each date in the full range and for each detection type,
  // if there is no record in processedFilteredData, add one with total: 0.
  fullDateRange.forEach(dateStr => {
    uniqueTypes.forEach(type => {
      const exists = processedFilteredData.some(item => item.time === dateStr && item.type === type);
      if (!exists) {
        processedFilteredData.push({ time: dateStr, type, total: 0 });
      }
    });
  });
  
  // Combine processed filtered data with trendlineDetectionData.
  let combined = [
    ...processedFilteredData,
    ...(trendlineDetectionData || [])
  ];
  
  // Sort combined array by date using the parseDateString helper.
  combined = combined.sort(
    (a, b) => parseDateString(a.time).getTime() - parseDateString(b.time).getTime()
  );
  
  setCombinedDetectionData(combined);
  console.log("detection data: ", combined);
}, [filteredDetectionData, trendlineDetectionData]);

    
  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
  };

  const handleRowClick = (record: any) => {
    openModal('Details', <div>{JSON.stringify(record.involvedObjects, null, 2)}</div>);
  };

   


  const config = useMemo(() => ({
  //  theme: 'classicDark',
    xField: 'date',
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: true },
    axis:{
      x:{title:'date'},
      y:{title: 'anomaly/detection value', min: 0}
    },
    colorField: 'type',
    // style: {
    //    textAlign: 'center', 
    //    display: 'flex',
    //   stroke: (items: { type: string }[]) => {
    //     const { type } = items[0];
    //     return type == 'anomaly' ? '#002353' : '#32c7c1';
    //   },
    //   lineWidth: 1,
    // }  
    style: {
      lineWidth: 1,
      textAlign: 'center', display: 'flex',
      stroke:(items: { type: string; }[]) => {
        const { type } = items[0];
        return type == 'anomalyCount' ? '#002353' : '#32c7c1';      },
    },


  }), []);

  const anomaliesTrendConfig = useMemo(() => ({
    //theme: 'classicDark',
    xField: 'time',
    yField: 'total',
    axis:{
      x:{title:'date'},
      y:{title: 'anomaly value', min: 0}
    },
    
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
  // Use onReady to attach a click listener at the plot level.
  onReady: ({ chart }: { chart: any }) => {
    console.log("Chart is ready", chart);
    
    chart.on('plot:click', (event: any) => {
      console.log("Plot click event:", event);
      
      // Get the canvas click coordinates.
      const { x, y } = event.canvas;
      console.log("Canvas coordinates:", x, y);

      
      // Attempt coordinate inversion.
      let coordinate;
      if (chart.chart && chart.chart.getCoordinate) {
        coordinate = chart.chart.getCoordinate();
      } else if (chart.getChart && chart.getChart().getCoordinate) {
        coordinate = chart.getChart().getCoordinate();
      }
      
      let clickedTime: any = null;
      if (coordinate && coordinate.invert) {
        const inverted = coordinate.invert({ x, y });
        console.log("Inverted coordinate:", inverted);
        if (inverted && inverted.x) {
          clickedTime = inverted.x;
        }
      }
      
      // Fallback: if inversion didn’t work, compute based on canvas x.
      if (!clickedTime) {
        console.warn("Coordinate inversion failed. Using fallback.");
        // Try getting chart width (using chart.getWidth if available)
        let chartWidth = chart.getWidth ? chart.getWidth() : 1300;
        // Compute the time domain from your data (parsing date strings properly)
        const timeValues = chart.children[0].value.data.map((record: any) => parseDate(record.time).getTime());
        const minTime = Math.min(...timeValues);
        const maxTime = Math.max(...timeValues);
        // Determine the proportion along the chart width.
        const proportion = x / chartWidth;
        const computedTime = new Date(minTime + proportion * (maxTime - minTime));
        clickedTime = computedTime.toISOString();
        console.log("Computed clicked time (fallback):", computedTime);
      } else {
        console.log("Clicked time from inversion:", clickedTime);
      }
      
      // Convert clickedTime to a timestamp.
      const clickedTimestamp = new Date(clickedTime).getTime();
      console.log("Clicked timestamp:", clickedTimestamp);
      
      // Find the record in combinedAnomalyData whose time is closest.
      const closestRecord = chart.children[0].value.data.reduce((prev: any, curr: any) => {
        const prevTime = parseDate(prev.time).getTime();
        const currTime = parseDate(curr.time).getTime();
        return Math.abs(currTime - clickedTimestamp) < Math.abs(prevTime - clickedTimestamp)
          ? curr
          : prev;
      }, chart.children[0].value.data[0]);
      
      console.log("Closest record:", closestRecord);
      
      // Update state with the closest record.
      setSelectedAnpmalyDayData([closestRecord]);
      setIsAnomalyModalVisible(true);
    });
  },

  
  
    sizeField: 'total',
   // shapeField: 'trail',
//     legend: { size: true,
//  },
legend:false,
    colorField: 'type',
   
  }), []);
  const handlePointClick = (event: any) => {
    console.log("Clicked Point Event:", event); // Debug log
    const data = event?.data?.data;
    if (data) {
      setSelectedAnpmalyDayData([data]); // Update state with selected point data
      setIsAnomalyModalVisible(true); // Show modal
    }
  };
  // Helper: parse a date string in DD-MM-YYYY format.
function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.split('-');
  return new Date(`${year}-${month}-${day}`);
}
    
  const detectionsTrendConfig = useMemo(() => ({
   // theme: 'classicDark',
    xField: 'time',
    yField: 'total',
    axis:{
      x:{title:'date'},
      y:{title: 'detection value'}
    },
      
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
    // Use onReady to attach a click listener at the plot level.
    onReady: ({ chart }: { chart: any }) => {
      console.log("Chart is ready", chart);
      chart.on('plot:click', (event: any) => {
        console.log("Plot click event:", event);
        
        // Get the canvas click coordinates.
        const { x, y } = event.canvas;
        console.log("Canvas coordinates:", x, y);
  
        
        // Attempt coordinate inversion.
        let coordinate;
        if (chart.chart && chart.chart.getCoordinate) {
          coordinate = chart.chart.getCoordinate();
        } else if (chart.getChart && chart.getChart().getCoordinate) {
          coordinate = chart.getChart().getCoordinate();
        }
        
        let clickedTime: any = null;
        if (coordinate && coordinate.invert) {
          const inverted = coordinate.invert({ x, y });
          console.log("Inverted coordinate:", inverted);
          if (inverted && inverted.x) {
            clickedTime = inverted.x;
          }
        }
        
        // Fallback: if inversion didn’t work, compute based on canvas x.
        if (!clickedTime) {
          console.warn("Coordinate inversion failed. Using fallback.");
          // Try getting chart width (using chart.getWidth if available)
          let chartWidth = chart.getWidth ? chart.getWidth() : 1300;
          // Compute the time domain from your data (parsing date strings properly)
          const timeValues = chart.children[0].value.data.map((record: any) => parseDate(record.time).getTime());
          const minTime = Math.min(...timeValues);
          const maxTime = Math.max(...timeValues);
          // Determine the proportion along the chart width.
          const proportion = x / chartWidth;
          const computedTime = new Date(minTime + proportion * (maxTime - minTime));
          clickedTime = computedTime.toISOString();
          console.log("Computed clicked time (fallback):", computedTime);
        } else {
          console.log("Clicked time from inversion:", clickedTime);
        }
        
        // Convert clickedTime to a timestamp.
        const clickedTimestamp = new Date(clickedTime).getTime();
        console.log("Clicked timestamp:", clickedTimestamp);
        
        // Find the record in combinedAnomalyData whose time is closest.
        const closestRecord = chart.children[0].value.data.reduce((prev: any, curr: any) => {
          const prevTime = parseDate(prev.time).getTime();
          const currTime = parseDate(curr.time).getTime();
          return Math.abs(currTime - clickedTimestamp) < Math.abs(prevTime - clickedTimestamp)
            ? curr
            : prev;
        }, chart.children[0].value.data[0]);
        
        console.log("Closest record:", closestRecord);
        
        // Update state with the closest record.
        setSelectedDetectionDayData([closestRecord]);
        setIsDetectionModalVisible(true);
      });
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

      // const startPoint = [minTime, m * minTime + b];
      // const endPoint = [maxTime, m * maxTime + b];

      // // Format these points into the desired structure
      // const startFormattedDate = formatDate(new Date(startPoint[0]));
      // const endFormattedDate = formatDate(new Date(endPoint[0]));

      // trendlineData.push({
      //   time: startFormattedDate,
      // //  total: startPoint[1] + 0.5,
      // total: startPoint[1],
      //   type: `${type} (Trend)`,
      // });

      // trendlineData.push({
      //   time: endFormattedDate,
      //  // total: endPoint[1] + 0.5,
      //  total: endPoint[1],
      //   type: `${type} (Trend)`,
      // });
      const startTotal = m * minTime + b;
const endTotal = m * maxTime + b;

// Format these points into the desired structure
const startFormattedDate = formatDate(new Date(minTime));
const endFormattedDate = formatDate(new Date(maxTime));

trendlineData.push({
  time: startFormattedDate,
  total: startTotal < 0 ? 0 : startTotal, // force negative values to 0
  type: `${type} (Trend)`,
});

trendlineData.push({
  time: endFormattedDate,
  total: endTotal < 0 ? 0 : endTotal, // force negative values to 0
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
const handleChartReady = (plot: any) => {
  console.log("chart ready");

  plot.on('element:click', (event: any) => {
    console.log("tnezlet l point");
    const { data } = event;
    if (data) {
      setSelectedAnpmalyDayData([data]); // Set the clicked data in state
      setIsAnomalyModalVisible(true); // Open the modal
    }
  });
};
  return (
    <Layout>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} lg={12}>
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
        <Col xs={24} lg={12}>
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

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24}>
        <Card
      title={isOneDateOnly? "Anomalies Trend for " + firstAnomalyDate : "Anomalies Trend"}
      extra={
        <>
          <Select
  mode="multiple"
  allowClear
  style={{ width: '100%', maxWidth: 600, marginRight: 16 }}
  placeholder="Select anomaly types"
  value={selectedAnomalyTypes}
  onChange={handleAnomalyTypeChange}
  options={options}
/>

          <FullscreenOutlined
            onClick={() =>
              openModal('Anomalies Trend', (
                <div>
                   <Select
            mode="multiple"
            allowClear
            style={{ width: '100%', maxWidth: 600, marginRight: 16 }}
            placeholder="Select anomaly types"
            value={selectedAnomalyTypes}
            onChange={handleAnomalyTypeChange}
            options={options} // Use the options array here
          />
                <Line
  data={combinedAnomalyData ? combinedAnomalyData.sort() : combinedAnomalyData}
  autoFit            /* turns on responsive width & height */
  {...anomaliesTrendConfig}
/>
                </div>
              ))
            }
          />
        </>
      }
    >
      {!tinyAnomalyData ? <Spin /> : <Line   data={combinedAnomalyData?combinedAnomalyData.sort():combinedAnomalyData} autoFit
      {...anomaliesTrendConfig} 
      // onEvent={(chart, event) => {
      //   if (event.type === 'element:click') {
      //     handlePointClick(event);
      //   }
      // }}
      // onReady={handleChartReady}
    
      />}
    </Card>
          {/* Modal to display anomalies for the selected day */}
          {/* <Modal
        title="Anomalies for Selected Day"
        visible={isAnomalyModalVisible}
        onCancel={() => setIsAnomalyModalVisible(false)}
        footer={null} // Remove default footer buttons
      >
        {selectedAnpmalyDayData.length > 0 ? (
          <ul>
            {selectedAnpmalyDayData.map((anomaly, index) => (
              <li key={index}>
                <strong>Type:</strong> {anomaly.type},{' '}
                <strong>Total:</strong> {anomaly.total}
              </li>
            ))}
          </ul>
        ) : (
          <p>No anomalies found for this day.</p>
        )}
      </Modal> */}
    

    <Card
      title={isOneDetectionDateOnly? "Detections Trend for " + firstDetectionDate : "Detections Trend"}
      extra={
        <>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%', maxWidth: 600, marginRight: 16 }}
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
                <Line  data={combinedDetectionData} autofit {...detectionsTrendConfig}  />
                </div>
              ))
            }
          />
        </>
      }
    >
      {!tinyDataDetection ? <Spin /> : <Line  data={combinedDetectionData} autoFit {...detectionsTrendConfig} />}
    </Card>
          <Card
            title="Anomalies and detections count graph"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomalies and detections graph', (
                    <Line   data={combinedData} autoFit {...config} />
                  ))
                }
              />
            }
          >
            {!combinedData ? <Spin /> : <Line  data={combinedData} autoFit {...config} />}
          </Card>
        </Col>
      </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>

<Col xs={24} lg={12}>
    <Card
      title="Anomalies Distribution"
      extra={
        <FullscreenOutlined
          onClick={() =>
            openModal('Anomalies Distribution', (
              <PieChartWithPopup data={anomalyDistribution} type={"anomalyType"}/>
            ))
          }
        />
      }
    >
           <PieChartWithPopup  data={anomalyDistribution} type={"anomalyType"}/>

    </Card>
  </Col>

  <Col xs={24} lg={12}>
    <Card
      title="Detections Distribution"
      extra={
        <FullscreenOutlined
          onClick={() =>
            openModal('Detections Distribution', (
              <PieChartWithPopup data={detectionDistribution} type={"detectionType"}/>
            ))
          }
        />
      }
    >
           <PieChartWithPopup  data={detectionDistribution} type={"detectionType"}/>

    </Card>
  </Col>

        {/* <Col xs={24} lg={12}>
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

        <Col xs={24} lg={12}>
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


      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>

      <Col xs={24} lg={12}>
          <Card
            title="Anomalies Involved Objects"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Anomalies Involved Objects', (
                    <BarChartWithPopup anomaliesData={filteredAnomalyDataState? filteredAnomalyDataState : anomalyData}/>
                  ))
                }
              />
            }
          >
                 <BarChartWithPopup anomaliesData={filteredAnomalyDataState? filteredAnomalyDataState : anomalyData}/>

          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="Detections Involved Objects"
            extra={
              <FullscreenOutlined
                onClick={() =>
                  openModal('Detections Involved Objects', (
                    <BarChartWithPopup anomaliesData={filteredDetectionDataState? filteredDetectionDataState : detectionData}/>
                  ))
                }
              />
            }
          >
                 <BarChartWithPopup anomaliesData={filteredDetectionDataState? filteredDetectionDataState : detectionData}/>

          </Card>
        </Col>
        </Row>


        {/* <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24}>
        <Card
            title="Line chart"
          >
          <LineChart/>
          </Card>
        </Col>
      </Row> */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24}>
        <Card
            title="Anomalies Locations"
            extra={userGroup!='uc2_wings' && !isBeiaEvent && anomaliesMapData && anomaliesMapData.length>0 && <FullscreenOutlined onClick={() => openModal('Anomalies Map', <MapComponent locations={anomaliesMapData.map(item => item)} center={[anomaliesMapData[0].geometry.coordinates[0][0],anomaliesMapData[0].geometry.coordinates[0][1]]}  />)} />}
          >
            {anomaliesMapData === undefined && <Spin />}
            {userGroup!='uc2_wings' && !isBeiaEvent  && anomaliesMapData && anomaliesMapData.length>0 && <MapComponent key={Math.floor(Math.random() * 9) +Math.floor(100000000)} locations={anomaliesMapData} center={[anomaliesMapData[0].geometry.coordinates[0][0],anomaliesMapData[0].geometry.coordinates[0][1]]} />}
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24}>
        <Card
            title="Detections Locations"
            extra={userGroup!='uc2_wings' && !isBeiaEvent  && detectionMapData && detectionMapData.length>0 &&<FullscreenOutlined onClick={() => openModal('Detection Map', <MapComponent locations={detectionMapData} center={[detectionMapData[0].geometry.coordinates[0][0],detectionMapData[0].geometry.coordinates[0][1]]}  />)} />}
          >
            {detectionData === undefined && <Spin />}
            {userGroup!='uc2_wings' && !isBeiaEvent  && detectionMapData && detectionMapData != undefined && detectionMapData.length>0 && <MapComponent key={Math.floor(Math.random() * 9) +Math.floor(100000000)} locations={detectionMapData} center={[detectionMapData[0].geometry.coordinates[0][0],detectionMapData[0].geometry.coordinates[0][1]]} />}
          </Card>
        </Col>
      </Row>
      

      <Modal
        title={modalTitle}
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width="100vw"
        style={{ top: 0, padding: 0 }}
        modalRender={(modalContent) => (
          <div style={{ height: '100vh', padding: 0 }}>
            {modalContent}
          </div>
        )}
      >
        {modalContent}
      </Modal>

<Modal
  title="Anomalies for Selected Day"
  visible={isAnomalyModalVisible}
  onCancel={() => setIsAnomalyModalVisible(false)}
  footer={null} // Remove default footer buttons
>
  {selectedAnpmalyDayData.length > 0 ? (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#002353' }}>
      {(() => {
        const selected = selectedAnpmalyDayData[0];
        const formattedDate = formatDateTime(selected.time);
        const relatedAnomalies = anomalyData.filter(item =>
          selected.ids && selected.ids.includes(item.id)
        );
        return (
          <div>
            <div
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #32c7c1',
                paddingBottom: '10px'
              }}
            >
              <h3 style={{ margin: 0, color: '#002353' }}>
                Selected Date &amp; Time: {formattedDate}
              </h3>
              <p style={{ margin: '5px 0' }}>
                <strong>Anomaly Type:</strong> {selected.type}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Total Anomalies:</strong> {selected.total}
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '10px', color: '#002353' }}>Anomalies Information:</h4>
              {relatedAnomalies.length > 0 ? (
                relatedAnomalies.map((anomaly, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: '20px',
                      padding: '15px',
                      border: '1px solid #32c7c1',
                      borderRadius: '5px'
                    }}
                  >
                    <p style={{ margin: '0 0 5px' }}>
                      <strong>ID:</strong> {anomaly.id}
                    </p>
                    <p style={{ margin: '0 0 10px' }}>
                      <strong>Anomaly Type:</strong> {anomaly.anomalyType}
                    </p>
                    <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
                      <p style={{ margin: '0 0 5px' }}>
                        <strong>Involved Objects:</strong>
                      </p>
                      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {anomaly.involvedObjects[0].location && anomaly.involvedObjects.map((obj: { location: { properties: { detectionConfidence: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; trackingConfidence: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; visualId: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => (
                          <li key={idx} style={{ marginBottom: '5px' }}>
                            <p style={{ margin: 0 }}>
                              <strong>Detection Confidence:</strong>{' '}
                              {(obj.location && obj.location.properties.detectionConfidence)? obj.location.properties.detectionConfidence : 'No data available from ' + userGroup}
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong>Tracking Confidence:</strong>{' '}
                              {(obj.location && obj.location.properties.trackingConfidence)? obj.location.properties.trackingConfidence: 'No data available from ' + userGroup}
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong>Type:</strong> {obj.type? obj.type : 'No data available from ' + userGroup}
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong>Visual ID:</strong> {obj.visualId? obj.visualId : 'No data available from ' + userGroup}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 5px' }}>
                        <strong>Tracking Detection:</strong>
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Detection Confidence:</strong>{' '}
                        {anomaly.trackingDetection? anomaly.trackingDetection.detectionConfidence.join(', '): 'No data available from ' + userGroup}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Tracking Confidence:</strong>{' '}
                        {anomaly.trackingDetection? anomaly.trackingDetection.trackingConfidence[0] : 'No data available from ' + userGroup}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No detailed anomaly information available.</p>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  ) : (
    <p style={{ padding: '20px', color: '#002353' }}>No anomalies found for this day.</p>
  )}
</Modal>

<Modal
  title="Detections for Selected Day"
  visible={isDetectionModalVisible}
  onCancel={() => setIsDetectionModalVisible(false)}
  footer={null} // Remove default footer buttons
>
  {selectedDetectionDayData.length > 0 ? (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#002353' }}>
      {(() => {
        const selected = selectedDetectionDayData[0];
        const formattedDate = formatDateTime(selected.time);
        const relatedAnomalies = detectionData.filter(item =>
          selected.ids && selected.ids.includes(item.id)
        );
        return (
          <div>
            <div
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #32c7c1',
                paddingBottom: '10px'
              }}
            >
              <h3 style={{ margin: 0, color: '#002353' }}>
                Selected Date &amp; Time: {formattedDate}
              </h3>
              <p style={{ margin: '5px 0' }}>
                <strong>Detection Type:</strong> {selected.type}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Total Detections:</strong> {selected.total}
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '10px', color: '#002353' }}>Detections Information:</h4>
              {relatedAnomalies.length > 0 ? (
                relatedAnomalies.map((anomaly, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: '20px',
                      padding: '15px',
                      border: '1px solid #32c7c1',
                      borderRadius: '5px'
                    }}
                  >
                    <p style={{ margin: '0 0 5px' }}>
                      <strong>ID:</strong> {anomaly.id}
                    </p>
                    <p style={{ margin: '0 0 10px' }}>
                      <strong>Detection Type:</strong> {anomaly.detectionType}
                    </p>
                    <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
                      <p style={{ margin: '0 0 5px' }}>
                        <strong>Involved Objects:</strong>
                      </p>
                      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {anomaly.involvedObjects[0].location &&  anomaly.involvedObjects.map((obj: { location: { properties: { detectionConfidence: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; trackingConfidence: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }; type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; visualId: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => (
                          <li key={idx} style={{ marginBottom: '5px' }}>
                            <p style={{ margin: 0 }}>
                              <strong>Detection Confidence:</strong>{' '}
                              {obj.location.properties.detectionConfidence? obj.location.properties.detectionConfidence : 'No data available from ' + userGroup}
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong>Tracking Confidence:</strong>{' '}
                              {obj.location.properties.trackingConfidence? obj.location.properties.trackingConfidence : 'No data available from ' + userGroup}
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong>Type:</strong> {obj.type? obj.type : 'No data available from ' + userGroup}
                            </p>
                            <p style={{ margin: 0 }}>
                              <strong>Visual ID:</strong> {obj.visualId ? obj.visualId : 'No data available from ' + userGroup}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 5px' }}>
                        <strong>Tracking Detection:</strong>
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Detection Confidence:</strong>{' '}
                        {anomaly.trackingDetection? anomaly.trackingDetection.detectionConfidence.join(', ') : 'No data available from ' + userGroup}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Tracking Confidence:</strong>{' '}
                        {anomaly.trackingDetection? anomaly.trackingDetection.trackingConfidence[0] : 'No data available from ' + userGroup}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No detailed detections information available.</p>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  ) : (
    <p style={{ padding: '20px', color: '#002353' }}>No detections found for this day.</p>
  )}
</Modal>


    </Layout>
  );
};

export default AnalyticsDashboard;
