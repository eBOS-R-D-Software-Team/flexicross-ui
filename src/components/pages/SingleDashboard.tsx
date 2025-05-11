// MyComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { getDashboardDataById } from '../../redux/slices/riskDataSlice';
import { Button, Card, Col, Collapse, Descriptions, Layout, Modal, Row, Select, Spin, Table, Tag } from 'antd';
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
  console.log(selectedDashboard)
  const [graphData, setGraphData] = React.useState<any>();
  const [statsData, setStatsData] = React.useState<any>();
  const [tinyRiskData, setTinyRiskData] = React.useState<any[]>();
  const [trendlineData, setTrendlineData] = React.useState<any[]>();
  const [combinedRiskData, setCombinedRiskData] = React.useState<any[]>();
  const [isRiskModalVisible, setIsRiskModalVisible] = React.useState(false);
  const [selectedRiskDayData, setSelectedRiskDayData] = React.useState<any[]>([]);
  const [modalData, setmodalData] =React.useState<any>(null)
  const [selectedRiskTypes, setSelectedRiskTypes] = React.useState<string[]>([]);
  const [selectedTrendLines, setSelectedTrendLines] = React.useState<string[]>([]);

  console.log(selectedRiskDayData)
console.log("modal data :",modalData)
console.log("trendlineData :",trendlineData)
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
  const hoverDataRef = React.useRef<{
    tooltipDate?: string;
    tooltipItems?: any[];
  }>({});
  const combinedRiskDataRef = React.useRef(combinedRiskData);

// Update ref when data changes
useEffect(() => {
  combinedRiskDataRef.current = combinedRiskData;
}, [combinedRiskData]);

const selectedDashboardRef = React.useRef(selectedDashboard);

// Update ref when data changes
useEffect(() => {
  selectedDashboardRef.current = selectedDashboard;
}, [selectedDashboard]);

useEffect(() => {
  if (combinedRiskData) {
    // Get all unique risk types (excluding trends)
    const allTypes = new Set<string>();
    combinedRiskData.forEach(item => {
      if (!item.type.includes('(Trend)')) {
        allTypes.add(item.type);
      }
    });
    // Initialize with all types selected
    setSelectedRiskTypes(Array.from(allTypes));
  }
}, [combinedRiskData]);
const handleRiskTypeChange = (selectedTypes: string[]) => {
  setSelectedRiskTypes(selectedTypes);
};
const filteredTrendlineData = React.useMemo(() => {
  if (selectedTrendLines.length === 0) return combinedRiskData;
  
  return combinedRiskData?.filter(item => {
    const baseType = item.type.replace(' (Trend)', '');
    return selectedTrendLines.includes(baseType);
  });
}, [combinedRiskData, selectedTrendLines]);

const filteredTrendlineDataRef = React.useRef(filteredTrendlineData);

// Update ref when filtered data changes
useEffect(() => {
  filteredTrendlineDataRef.current = filteredTrendlineData;
}, [filteredTrendlineData]);

  const risksTrendConfig = React.useMemo(() => ({
    //theme: 'classicDark',
    autoFit:true,
    xField: 'time',
    yField: 'total',

    axis:{
      x:{title:'date'},
      y:{title: 'risk total'}
    },
   

    style: {
      lineWidth: (items: any) => items[0]?.type?.includes('(Trend)') ? 2 : 3,
      textAlign: 'center', 
      display: 'flex',
      lineDash: (items: any) => {
        return items[0]?.type?.includes('(Trend)') ? [4, 4] : [0, 0];
      },
      stroke: (items: any) => {
        const type = items[0]?.type?.replace(' (Trend)', '');
        return getRiskLineColor(type);
      },
      opacity: (items: any) => {
        return items[0]?.type?.includes('(Trend)') ? 0.7 : 1;
      }
    },

  interaction: {
    
    tooltip: {
      render: (e:any, { title, items }: { title:any, items:any }) => {
        const list = items.filter((item: { value: any; }) => item.value);
        // Store only the hovered date and items in state
        hoverDataRef.current = { tooltipDate: title, tooltipItems: list };
console.log(hoverDataRef.current)
        // console.log(modalData)
        // Update modalData state
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
    chart.on('plot:click', (event: any) => {
      const tooltipDate = hoverDataRef.current.tooltipDate;
      if (!tooltipDate) return;
      
      // Use the filtered data ref instead of combinedRiskDataRef
      const currentFilteredData = filteredTrendlineDataRef.current;
      const currentSelectedDashboardData = selectedDashboardRef.current;
      
      if (!currentFilteredData || !currentSelectedDashboardData) return;
      
      try {
        const [day, month, year] = tooltipDate.split("-");
        const tooltipDateObj = new Date(`${year}-${month}-${day}`);
        
        if (!isNaN(tooltipDateObj.getTime())) {
          const formattedTooltipDate = `${String(tooltipDateObj.getDate()).padStart(2, '0')}-${String(tooltipDateObj.getMonth() + 1).padStart(2, '0')}-${tooltipDateObj.getFullYear()}`;
          
          // Filter using the filtered data
          const risksForDate = currentFilteredData.filter(item => 
            item.time === formattedTooltipDate && !item.type?.includes('(Trend)')
          );
          
          const trendsForDate = currentFilteredData.filter(item => 
            item.time === formattedTooltipDate && item.type?.includes('(Trend)')
          );
          
          // Get risk details if available
          const riskDetails: any[] = [];
          if (currentSelectedDashboardData?.data) {
            risksForDate.forEach(riskEntry => {
              riskEntry.ids?.forEach((id: string) => {
                const foundRisk = currentSelectedDashboardData.data.find((r: any) => r.id === id);
                if (foundRisk) riskDetails.push(foundRisk);
              });
            });
          }
          
          setmodalData({
            date: formattedTooltipDate,
            trends: trendsForDate,
            risks: risksForDate,
            riskDetails
          });
        }
        setIsRiskModalVisible(true);
      } catch (e) {
        console.error('Error handling click:', e);
      }
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
      title="Risks Trend">

          {graphData === undefined && <Spin />}
            {/* {graphData && <RiskTrendChart graphData={graphData} />} */}
            
            {!tinyRiskData ? <Spin /> : <>
            {/* <Select
  mode="multiple"
  placeholder="Select Trend Lines"
  value={selectedTrendLines}
  onChange={setSelectedTrendLines}
  style={{ width: '100%', marginBottom: 20 }}
>
  {Array.from(new Set(combinedRiskData?.map(item => item.type))).map(type => (
    <Select.Option key={type} value={type}>
      {type}
    </Select.Option>
  ))}
</Select> */}
<Select
  mode="multiple"
  placeholder="Select Trend Lines"
  value={selectedTrendLines}
  onChange={setSelectedTrendLines}
  style={{ width: '100%', marginBottom: 20 }}
  optionFilterProp="children"
  filterOption={(input: string, option?: { children?: string }) => {
    return (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
  }}
>
  {Array.from(
    new Set(
      combinedRiskData
        ?.map(item => item.type.replace(' (Trend)', ''))
        .filter(type => type) // Remove any empty strings
    )
  ).map(type => (
    <Select.Option key={type} value={type}>
      {type}
    </Select.Option>
  ))}
</Select>
<Line    data={filteredTrendlineData ? [...filteredTrendlineData].sort() : []} 
  {...risksTrendConfig}  /></> }
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
  title={`Risk Details for ${modalData?.date}`}
  visible={isRiskModalVisible}
  onCancel={() => setIsRiskModalVisible(false)}
  footer={null}
  width={1000}
>
  {modalData ? (
    <div>
      {/* <Row gutter={16}>
       
        <Col span={24}>
          <h3>Risk Counts</h3>
          <Table
          style={{background:'white'}}
            columns={[
              { title: 'Risk Type', dataIndex: 'type', key: 'type' },
              { title: 'Count', dataIndex: 'total', key: 'total' }
            ]}
            dataSource={modalData.risks || []}
            pagination={false}
            size="small"
          />
        </Col>
      </Row> */}

      {/* <h3 style={{ marginTop: 20 }}>Detailed Risk Information</h3> */}
      {modalData.riskDetails?.length > 0 ? (
        <Collapse accordion>
          {modalData.riskDetails.map((risk: any, index: number) => (
            <Collapse.Panel 
            style={{ 
              marginBottom: 16, 
              border: '2px solid #32c7c1',
              color: '#002353',
              borderRadius: 8,
              overflow: 'hidden'
            }}
              header={`${risk.riskType} — ${formatDateTime(risk.datetime)}`} 
              key={risk.id}
              // extra={<Tag color={getRiskLineColor(risk.riskType)}>{risk.severity}</Tag>}
            >
               <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", paddingLeft: "0.5rem", display: "flex", flexDirection: "column" }}>
                    <p style={{margin:"unset"}}><strong>ID:</strong> {risk.id}</p>
                    <p style={{margin:"unset"}}><strong>Risk Type:</strong> {risk.riskType}</p>
                    <p style={{margin:"unset"}}><strong>Visual ID:</strong> {risk.visualId}</p>
                    <p style={{margin:"unset"}}><strong>Risk Severity:</strong> {risk.severity}</p>
                    <p style={{margin:"unset"}}><strong>Risk Probability:</strong> {risk.probability}</p>
                    {risk.metrics?.map((metric: { key: React.Key | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; unit: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                      <div key={metric.key}>
                        <strong>{metric.description}:</strong> {metric.value} {metric.unit}
                      </div>
                    ))}
                  </div>
              {/* <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ID">{risk.id}</Descriptions.Item>
                <Descriptions.Item label="Type">{risk.riskType}</Descriptions.Item>
                <Descriptions.Item label="Severity">
                  <Tag color={getRiskLineColor(risk.riskType)}>{risk.severity}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Probability">{risk.probability}</Descriptions.Item>
                <Descriptions.Item label="Date/Time">
                  {formatDateTime(risk.datetime)}
                </Descriptions.Item>
                
                {risk.metrics?.length > 0 && (
                  <Descriptions.Item label="Metrics">
                    <Table
                      columns={[
                        { title: 'Description', dataIndex: 'description', key: 'description' },
                        { title: 'Value', dataIndex: 'value', key: 'value' },
                        { title: 'Unit', dataIndex: 'unit', key: 'unit' }
                      ]}
                      dataSource={risk.metrics}
                      pagination={false}
                      size="small"
                      bordered
                    />
                  </Descriptions.Item>
                )}
                
             
              </Descriptions> */}
            </Collapse.Panel>
          ))}
        </Collapse>
      ) : (
        <p>No detailed risk information available for this date.</p>
      )}
    </div>
  ) : (
    <Spin tip="Loading risk data..." />
  )}
</Modal>
    </Layout>
  );
};

export default SingleDashboard;
