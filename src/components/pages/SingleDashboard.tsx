// MyComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { getDashboardDataById } from '../../redux/slices/riskDataSlice';
import { Card, Col, Layout, Modal, Row, Spin, Table, Tag } from 'antd';
import { Bar, Heatmap } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import { countOccurrences, countRiskTypes, countRiskTypesForBarChart, countRiskTypesForPieChart, countRiskTypesForRiskPieChart, formatDateTime, getAnomalyLineColor, getRiskLineColor, parseDate, processRiskData } from '../../hooks/useRiskTypeCount';
import StatsGraph from '../shared/Graphs/StatsGraph';
import StackedBarChart from '../charts/StackedBarChart';
import RiskPieChart from '../charts/RiskPieChart';
import RiskTrendChart from '../charts/RiskTrendChart';
import { Line } from '@ant-design/plots';
import HeatMapChart from '../charts/HeatMapChart';
import RiskDetectedObjectsChart from '../charts/RiskDetectedObjectsChart';

type RouteParams = {
  id: string;
};

const SingleDashboard: React.FC = () => {
  // Retrieve the 'id' parameter from the route
  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const selectedDashboard = useSelector((state: RootState) => state.dashboardData.selectedDashboard);
  const [graphData, setGraphData] = React.useState<any>();
  const [statsData, setStatsData] = React.useState<any>();
  const [tinyRiskData, setTinyRiskData] = React.useState<any[]>();
  const [trendlineData, setTrendlineData] = React.useState<any[]>();
  const [combinedRiskData, setCombinedRiskData] = React.useState<any[]>();
  const [isRiskModalVisible, setIsRiskModalVisible] = React.useState(false);
  const [selectedRiskDayData, setSelectedRiskDayData] = React.useState<any[]>([]);
  

  useEffect(() => {
    dispatch(getDashboardDataById(id));
  }, [id, dispatch]);

  useEffect(() => {
    setGraphData(selectedDashboard?.data);
    if (graphData) {
      setStatsData(countOccurrences(graphData));
      const processedRiskData =  processRiskData(graphData);
        setTinyRiskData(processedRiskData);
        setTrendlineData(calculateTrendline(processedRiskData));
    }
  }, [selectedDashboard, graphData]);


  useEffect(() => {
    if (tinyRiskData && trendlineData) {
      const combined = [...tinyRiskData, ...trendlineData];
      combined.sort((a, b) => parseDate(a.time).getTime() - parseDate(b.time).getTime());
      setCombinedRiskData(combined);
    }
  }, [tinyRiskData, trendlineData]);
  
  const risksTrendConfig = React.useMemo(() => ({
    //theme: 'classicDark',
    xField: 'time',
    yField: 'total',
    axis:{
      x:{title:'date'},
      y:{title: 'risk total'}
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
     return getRiskLineColor(type);
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
                          backgroundColor: getRiskLineColor(name),
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
        if(chart.children[0].length){
        const timeValues = chart.children[0].value.data.map((record: any) => parseDate(record.time).getTime());
        const minTime = Math.min(...timeValues);
        const maxTime = Math.max(...timeValues);
        // Determine the proportion along the chart width.
        const proportion = x / chartWidth;
        const computedTime = new Date(minTime + proportion * (maxTime - minTime));
        clickedTime = computedTime.toISOString();
        console.log("Computed clicked time (fallback):", computedTime);
      }
      } else {
        console.log("Clicked time from inversion:", clickedTime);
      }
      
      // Convert clickedTime to a timestamp.
      const clickedTimestamp = new Date(clickedTime).getTime();
      console.log("Clicked timestamp:", clickedTimestamp);
      // Find the record in combinedAnomalyData whose time is closest.
      if(chart.children[0].length){

      const closestRecord = chart.children[0].value.data.reduce((prev: any, curr: any) => {
        const prevTime = parseDate(prev.time).getTime();
        const currTime = parseDate(curr.time).getTime();
        return Math.abs(currTime - clickedTimestamp) < Math.abs(prevTime - clickedTimestamp)
          ? curr
          : prev;
      }, chart.children[0].value.data[0]);
      
      console.log("Closest record:", closestRecord);
      setSelectedRiskDayData([closestRecord]);

    }
    else{
        setSelectedRiskDayData([]);

    }
      
      // Update state with the closest record.
      setIsRiskModalVisible(true);
    });
  },

  
  
    sizeField: 'total',
   // shapeField: 'trail',
//     legend: { size: true,
//  },
legend:false,
    colorField: 'type',
   
  }), []);

  // --- BAR CHART CONFIG (Light Mode + Project Colors) ---
  const config = {
    // Removed theme: "classicDark"
    xField: 'labelName',
    yField: 'value',
    paddingRight: 0,
    style: {
      maxWidth: 60,
      // You could add a stroke callback here if needed:
      // stroke: (items: { type: string }[]) => getAnomalyLineColor(items[0].type),
    },
    markBackground: {
      label: {
        text: (originData: any) => {
          return `${(originData.originData.value / 10) * 100}% | ${originData.originData.value}`;
        },
        position: 'left',
        dx: 180,
        style: {
          fill: '#002353', // primary dark blue for text
          color: '#002353',
          fillOpacity: 1,
          fontSize: 16,
        },
      },
      style: {
        textAlign: 'center',
        fill: '#f0f2f5', // light background
        fontSize: 32,
        fontStyle: 'bold',
      },
    },
    scale: {
      y: {
        domain: [0, 10],
      },
    },
    axis: {
      x: {
        tick: false,
        title: false,
      },
      y: {
        grid: false,
        tick: false,
        label: false,
        title: false,
      },
    },
    colorField: 'type',
    // (Optional) You can leave out the color array if you're handling stroke via callback.
    // color: ['#002353', '#32c7c1', '#003f72', '#2cc1ba', '#001f40', '#5ad4d0'],
  };

  // --- CUSTOM LABEL FOR PIE CHART ---
  const customLabel = (_: any, datum: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div
        style={{
          width: 8,
          height: 8,
          background: 'rgba(0,0,0,0.4)',
          marginRight: '8px',
          borderRadius: '50%',
        }}
      />
      <Tag>
        <b>{datum.labelName} - {datum.value}</b>
      </Tag>
    </div>
  );

  const configPie = {
    // Removed theme: "classicDark"
    angleField: 'value',
    colorField: 'labelName',
    label: {
      text: 'labelName',
      position: 'inside',
      textAlign: 'left',
      render: customLabel,
    },
    legend: false,
    style: {
      stroke: (items: { labelName?: string }[]) => {
        if ( items[0] && items[0].labelName) {
            return getAnomalyLineColor(items[0].labelName);
          
        }
        return  '#002353'; // default primary dark blue;
      },
    },
  };

  // --- HEATMAP CONFIG (Light Mode + Custom Color Gradient) ---
  const configHeat = {
    autoFit: true,
    height: 800,
    // Removed theme: "classicDark"
    data: graphData,
    xField: (d: any) => d.riskType,
    yField: (d: any) => d.severity,
    colorField: 'severity',
    legend: {},
    mark: 'cell',
    style: { inset: 0.5 },
    tooltip: {
      title: 'riskType',
      field: 'severity',
      valueFormatter: '~s',
      pointerEvents: 'none',
    },
    // Define a gradient for the heatmap using your project colors:
    color: ['#32c7c1', '#002353'],
  };
  // Function to calculate trendlines manually
  const calculateTrendline = (data: any[]) => {
    // Group data by type and preprocess it
    const groupedData = data.reduce((acc: any, curr: any) => {
      const type = curr.type || 'Contraband';
      const [day, month, year] = curr.time.split('-'); // dd-mm-yyyy format
      const time = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      const total = curr.total !== undefined ? Number(curr.total) : NaN;
  
      if (!isNaN(time) && !isNaN(total)) {
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push([time, total]);
      }
      return acc;
    }, {});
  
    let trendlineData: any[] = [];
  
    Object.keys(groupedData).forEach((type) => {
      let points = groupedData[type];
      if (points.length < 2) {
        console.warn(`Not enough data points for type "${type}" to calculate a trendline.`);
        return;
      }
  
      // Sort points by time (ascending)
      points = points.sort((a: number[], b: number[]) => a[0] - b[0]);
  
      // Extract x and y values for regression
      
      const xValues = points.map((p: any[]) => p[0]);
      const yValues = points.map((p: any[]) => p[1]);
      const n = points.length;
      const sumX = xValues.reduce((a: any, b: any) => a + b, 0);
      const sumY = yValues.reduce((a: any, b: any) => a + b, 0);
      const sumXY = points.reduce((a: number, p: number[]) => a + p[0] * p[1], 0);
      const sumX2 = xValues.reduce((a: number, b: number) => a + b * b, 0);
  
      // Calculate slope (m) and intercept (b)
      const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const b = (sumY - m * sumX) / n;
  
      // Use the first and last points (from sorted data) as endpoints
      const startTime = points[0][0];
      const endTime = points[points.length - 1][0];
      const startTotal = m * startTime + b;
      const endTotal = m * endTime + b;
  
      // Format the dates consistently (using your dd-mm-yyyy format)
      const startFormattedDate = formatDate(new Date(startTime));
      const endFormattedDate = formatDate(new Date(endTime));
  
      trendlineData.push({
        time: startFormattedDate,
        total: startTotal < 0 ? 0 : startTotal,
        type: `${type} (Trend)`,
      });
  
      trendlineData.push({
        time: endFormattedDate,
        total: endTotal < 0 ? 0 : endTotal,
        type: `${type} (Trend)`,
      });
    });
  
    return trendlineData;
  };
    
  // Helper function to format dates in dd-mm-yyyy format
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'riskType',
      dataIndex: 'riskType',
      key: 'riskType',
    },
    {
      title: 'severity',
      dataIndex: 'severity',
      key: 'severity',
    },
    {
      title: 'probability',
      dataIndex: 'probability',
      key: 'probability',
    },
  ];

  return (
    <Layout>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        {statsData && Object.keys(statsData.riskType) && Object.keys(statsData.riskType).map((key) => (
          <Col span={6} key={key}>
            <StatsGraph
              data={statsData.riskType[key]}
              total={statsData.statistics['total']}
              title={key.replace(/([A-Z])/g, ' $1').trim()}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={24} style={{ marginBottom: 32 }}>
        <Col span={24}>
          <Card>
            {graphData && <Table columns={columns} dataSource={graphData} />}
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
      <Col span={24}>

      {graphData === undefined && <Spin />}
            {graphData && <StackedBarChart loading={false} data={countRiskTypesForBarChart(graphData)} rawData={graphData}  />}
            </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
           <Card >
            {graphData === undefined && <Spin />}
            {graphData && <RiskPieChart data={countRiskTypesForRiskPieChart(graphData, 'severity')}  title="Severity Distribution" 
              rawData={graphData}
              flag="severity" />}
          </Card>
         
       </Col> 
        <Col span={12}>
          <Card >
            {graphData === undefined && <Spin />}
            {graphData && <RiskPieChart data={countRiskTypesForRiskPieChart(graphData, 'riskType')} title="Risk Type Distribution" 
              rawData={graphData}
              flag="riskType"/>}
          </Card>
        </Col>
      
      </Row>
      <Row gutter={24}>
        <Col span={24}>
        <Card
      title="Risks Trend"
>
          {graphData === undefined && <Spin />}
            {/* {graphData && <RiskTrendChart graphData={graphData} />} */}
            
            {!tinyRiskData ? <Spin /> : <Line width={1300}  data={combinedRiskData?combinedRiskData.sort():combinedRiskData} {...risksTrendConfig} />}
            </Card>
        </Col>
      </Row>
{/* ttest */}
<Row gutter={24}>
        <Col span={24}>
        <Card
      title="Risk Heat Map"
>
          {graphData === undefined && <Spin />}
            {/* {graphData && <RiskTrendChart graphData={graphData} />} */}
            
            {!tinyRiskData ? <Spin /> : <HeatMapChart data={selectedDashboard}   />}
            </Card>
        </Col>
      </Row>
<Row gutter={24}>
        <Col span={24}>
        <Card
      title="Risk by Object Type"
>
          {graphData === undefined && <Spin />}
            {/* {graphData && <RiskTrendChart graphData={graphData} />} */}
            
            {!tinyRiskData ? <Spin /> : <RiskDetectedObjectsChart risksData={selectedDashboard.data}   />}
            </Card>
        </Col>
      </Row>

{/* -------------- */}
      <Row gutter={24}>
        {/* <Col span={12}>
          {/* <Card title={'Risk Level by Type'}>
            {graphData === undefined && <Spin />}
            {graphData && <Bar data={countRiskTypes(graphData, 'riskType')} {...config} />}
          </Card> */}
         
        {/* </Col> */} 
        {/* <Col span={12}>
          <Card title={'Risk Status'}>
            {graphData === undefined && <Spin />}
            {graphData && <Pie data={countRiskTypes(graphData, 'severity')} {...configPie} />}
          </Card>
        </Col> */}
        <Col span={24}>
          <Card style={{ marginTop: 16 }} title={'Risk Matrix'}>
            {graphData === undefined && <Spin />}
            {graphData && <Heatmap {...configHeat} />}
          </Card>
        </Col>
      </Row>
      <Modal
  title="Risks for Selected Day"
  visible={isRiskModalVisible}
  onCancel={() => setIsRiskModalVisible(false)}
  footer={null} // Remove default footer buttons
>
  {selectedRiskDayData.length > 0 ? (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#002353' }}>
      {(() => {
        const selected = selectedRiskDayData[0];
        const formattedDate = formatDateTime(selected.time);
        const relatedRisks = graphData.filter((item: { id: any; }) =>
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
  <h4 style={{ marginBottom: '10px', color: '#002353' }}>Risk Information:</h4>
  {relatedRisks && relatedRisks.length > 0 ? (
    relatedRisks.map((risk: { id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; riskType: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; severity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; probability: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; datetime: string | number | Date; involvedObjects: any[]; trackingDetection: { detectionConfidence: any[]; trackingConfidence: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined)[]; }; }, index: React.Key | null | undefined) => (
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
          <strong>ID:</strong> {risk.id}
        </p>
        <p style={{ margin: '0 0 10px' }}>
          <strong>Risk Type:</strong> {risk.riskType}
        </p>
        <p style={{ margin: '0 0 10px' }}>
          <strong>Severity:</strong> {risk.severity}
        </p>
        <p style={{ margin: '0 0 10px' }}>
          <strong>Probability:</strong> {risk.probability}
        </p>
        <p style={{ margin: '0 0 10px' }}>
          <strong>Date/Time:</strong> {formatDate(new Date(risk.datetime))}
        </p>
        <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
          <p style={{ margin: '0 0 5px' }}>
            <strong>Involved Objects:</strong>
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {risk.involvedObjects && risk.involvedObjects.map((obj, idx) => (
              <li key={idx} style={{ marginBottom: '5px' }}>
                <p style={{ margin: 0 }}>
                  <strong>Detection Confidence:</strong> {obj.location.properties.detectionConfidence}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Tracking Confidence:</strong> {obj.location.properties.trackingConfidence}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Type:</strong> {obj.type}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Visual ID:</strong> {obj.visualId}
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
            <strong>Detection Confidence:</strong> {risk.trackingDetection.detectionConfidence.join(', ')}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Tracking Confidence:</strong> {risk.trackingDetection.trackingConfidence[0]}
          </p>
        </div>
      </div>
    ))
  ) : (
    <p>No detailed risk information available.</p>
  )}
</div>

          </div>
        );
      })()}
    </div>
  ) : (
    <p style={{ padding: '20px', color: '#002353' }}>No risks found for this day.</p>
  )}
</Modal>
    </Layout>
  );
};

export default SingleDashboard;
