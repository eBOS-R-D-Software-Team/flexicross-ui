import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Modal,DatePicker, ConfigProvider } from 'antd';
import { ActiveShape } from 'recharts/types/util/types';
import { countRiskTypesForPieChart } from '../../hooks/useRiskTypeCount';
import dayjs from 'dayjs'; // To work with date formatting and comparison

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#2389ff', '#7f6bff', '#c1952f', '#a2d5c6','#2f97b7','#f3ca20','#d72631'];

const PieChartWithPopup = (props: { data: any; type:string}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<ChartData | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>(props.data || []);
  const handleClick = (entry: ChartData) => {
    setSelectedData(entry);
    setIsModalVisible(true);
  };
  let data = props.data? props.data : [];
  useEffect(() => {
    if(filteredData.length == 0) setFilteredData(data);
  
  }, [data]);
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const filtered = props.data.filter((item: { time: string | number | dayjs.Dayjs | Date | null | undefined; }) =>{
       return  dayjs(item.time, 'DD-MM-YYYY').isSame(date, 'day') // Parse 'time' and compare with selected date
       } );
      setFilteredData(filtered);
    } else {
      setFilteredData(props.data); // Reset to original data if no date is selected
    }
  };


  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#1d1d1d', // Dark mode background
          colorText: '#fff', // Text color
          colorBorder: '#444', // Border color
        },
      }}
    >
    <div style={{ textAlign: 'center' }}>
      {/* Date Picker */}
      <DatePicker
          onChange={handleDateChange}
          style={{
            marginBottom: 20,
            backgroundColor: '#1d1d1d',
            color: '#fff',
            border: '1px solid #444',
          }}
          picker="date" // Regular date picker
        />
      <PieChart width={650} height={500}>
      <Legend
          layout="horizontal"
          verticalAlign="top"
          align="center"
          iconType="circle" // Custom icon shape
          wrapperStyle={{
            fontSize: '12px', // Adjust the font size
            fontFamily: 'Arial, sans-serif', // Change the font family
            color: '#333 !Important', // Change the text color 
            maxWidth: '90%'
          }}
        />

        <Pie
          data={countRiskTypesForPieChart(filteredData, props.type)}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          onClick={handleClick} // Handle clicks on the pie segments
          stroke="none" // Removes the white border
        
        >
          {data.map((entry: any, index: number) => (
            <Cell style={{ outline: "none", cursor:"pointer" }} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1d1d1d', // Dark background
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            color: '#808080', // Text color
            border: 'none',
            fontSize: '13px',
          }}
          itemStyle={{
            color: '#fff', // Text color for items
          }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} // Optional: Highlight effect
        />  
        
        
      </PieChart>
      <Modal
        title="Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedData ? (
          <div>
            <p><strong>Type:</strong> {selectedData.name}</p>
            <p><strong>Value:</strong> {selectedData.value}</p>
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
