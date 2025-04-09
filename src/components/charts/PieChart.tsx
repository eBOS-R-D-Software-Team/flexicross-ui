import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Modal, DatePicker, ConfigProvider, Layout, Row, Col, Card, Tag } from 'antd';
import { countRiskTypesForPieChart } from '../../hooks/useRiskTypeCount';
import dayjs from 'dayjs';

//const COLORS = ['#0dcccc', '#2389ff', '#48dbfb', '#1dd1a1', '#ff6b6b', '#ff9f43', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd', '#ff4757'];
const COLORS = [
  '#002353', // dark blue (primary)
  '#32c7c1', // light blue (primary)
  '#418cc0', 
  '#003f73', // a deeper blue variant
  '#5F9EA0', // a brighter tint of light blue
  '#001f40', // a very dark blue accent
];

interface ChartData {
  name: string;
  value: number;
  ids: string[];
}

const PieChartWithPopup = (props: { data?: any; type?: string }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<ChartData | null>(null);
  const [filteredChartData, setFilteredChartData] = useState<any[]>([]);
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null); // Start date picker state
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null); // End date picker state

  // Initialize filteredChartData with props.data if it's defined
  useEffect(() => {
    if (props.data) {
      setFilteredChartData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (filteredChartData && filteredChartData.length > 0 && props.type) {
      const computedData = countRiskTypesForPieChart(filteredChartData, props.type);
      setProcessedData(computedData);

      console.log("type is : ", props.type);
      console.log("passed data to pie chart: ", filteredChartData);
      console.log("processed data: ", computedData);
    }
  }, [filteredChartData, props.type]);

  const handleClick = (entry: ChartData) => {
    setSelectedData(entry);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to calculate percentage
  const getPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  // Function to filter data based on the date range
  const handleDateRangeChange = (start: dayjs.Dayjs | null, end: dayjs.Dayjs | null) => {
    if (props.data) {
      if (start && end) {
        const filtered = props.data.filter((item: { time: string | number | dayjs.Dayjs | Date | null | undefined }) => {
          const itemDate = dayjs(item.time, 'DD-MM-YYYY');
          return (
            (itemDate.isSame(start, 'day') || itemDate.isAfter(start, 'day')) &&
            (itemDate.isSame(end, 'day') || itemDate.isBefore(end, 'day'))
          );
        });
        setFilteredChartData(filtered);
      } else if (start) {
        const filtered = props.data.filter((item: { time: string | number | dayjs.Dayjs | Date | null | undefined }) => {
          const itemDate = dayjs(item.time, 'DD-MM-YYYY');
          return itemDate.isSame(start, 'day') || itemDate.isAfter(start, 'day');
        });
        setFilteredChartData(filtered);
      } else if (end) {
        const filtered = props.data.filter((item: { time: string | number | dayjs.Dayjs | Date | null | undefined }) => {
          const itemDate = dayjs(item.time, 'DD-MM-YYYY');
          return itemDate.isSame(end, 'day') || itemDate.isBefore(end, 'day');
        });
        setFilteredChartData(filtered);
      } else {
        setFilteredChartData(props.data || []); // Reset to original data if no dates are selected
      }
    }
  };



// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = processedData.reduce((acc: number, curr: any) => acc + curr.value, 0);
    const percentage = getPercentage(payload[0].value, total);
    return (
      <div
        style={{
          backgroundColor: '#fff',       // white background
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          color: '#002353',             // dark blue text
          border: '1px solid #002353',    // light blue border
          fontSize: '13px',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0 0 4px 0', color: '#002353', fontWeight:'bold' }}>{`${payload[0].name}`}</p>
        <p style={{ margin: '0 0 4px 0' }}>{`Total: ${payload[0].value}`}</p>
        <p style={{ margin: '0 0 4px 0' }}>{`Percentage: ${percentage}%`}</p>
      </div>
    );
  }

  return null;
};

  return (
    <ConfigProvider
    theme={{
      token: {
        colorBgContainer: '#fff',   // white background
        colorText: '#002353',       // dark blue text
        colorBorder: '#32c7c1',     // light blue border
      },
    }}
    
    >
      <div style={{ textAlign: 'center' }}>
        {/* Date Range Picker */}
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <DatePicker
              onChange={(date) => {
                setStartDate(date);
                handleDateRangeChange(date, endDate);
              }}
              placeholder="Start Date"
              style={{
                backgroundColor: '#fff',
                color: '#002353',
                border: '1px solid #32c7c1',
              }}            
              picker="date"
            />
          </Col>
          <Col span={12}>
            <DatePicker
              onChange={(date) => {
                setEndDate(date);
                handleDateRangeChange(startDate, date);
              }}
              placeholder="End Date"
              style={{
                backgroundColor: '#fff',
                color: '#002353',
                border: '1px solid #32c7c1',
              }}            
              picker="date"
            />
          </Col>
        </Row>

        {/* Conditional rendering for the PieChart */}
        {processedData && processedData.length > 0 ? (
          <PieChart width={650} height={500}>
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              iconType="circle"
              wrapperStyle={{
                fontSize: '12px',
                fontFamily: 'Arial, sans-serif',
                color: '#333 !Important',
                maxWidth: '90%',
              }}
            />
            <Pie
              data={processedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              onClick={handleClick}
              stroke="none"
            >
              {processedData.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  cursor="pointer" // Ensure cursor is pointer
                  style={{outline: 'none'}}
                />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
            />
          </PieChart>
        ) : (
          <p>No data available to display.</p>
        )}

        {/* Modal for Selected Data */}
        <Modal
          title={`${props.type === 'anomalyType' ? 'Selected anomalies' : 'Selected detections'} details`}
          style={{ marginTop: '16px' }}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedData ? (
            <div style={{ padding: '15px' }}>
              <p>Type:</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tag color="cyan">{selectedData.name}</Tag>
              </div>
              <br />
              <p>Total number of cases:</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tag color="cyan">{selectedData.value}</Tag>
              </div>
              <br />
              <p>Dates of occurrences:</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {Array.from(
                  new Set(
                    filteredChartData
                      .filter((item: { ids: string[] }) => item.ids.includes(selectedData?.ids[0]))
                      .map((filteredItem: { time: string }) => filteredItem.time)
                  )
                ).map((uniqueTime, index) => (
                  <Tag key={index} color="cyan" style={{ margin: '5px' }}>
                    {uniqueTime as string}
                  </Tag>
                ))}
              </div>
              <br />
              <p>Ids of related cases:</p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {selectedData?.ids.map((uniqueId, index) => (
                  <Tag key={index} color="cyan" style={{ margin: '5px' }}>
                    {uniqueId as string}
                  </Tag>
                ))}
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default PieChartWithPopup;