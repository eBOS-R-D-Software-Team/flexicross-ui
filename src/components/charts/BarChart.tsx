import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Modal, ConfigProvider } from 'antd';

interface Anomaly {
  involvedObjects: { type: string; visualId: string }[];
}

interface ChartData {
  type: string;
  count: number;
  visualIds: string[];
}

//const COLORS = ['#2389ff', '#7f6bff', '#c1952f', '#a2d5c6', '#2f97b7', '#f3ca20', '#d72631'];
const COLORS = ['#0dcccc','#2389ff','#48dbfb', '#1dd1a1','#ff6b6b', '#ff9f43', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd', '#ff4757'];

const processAnomaliesData = (anomaliesData: Anomaly[]): ChartData[] => {
  const typeCounts: Record<string, { count: number; visualIds: string[] }> = {};

  anomaliesData.forEach((anomaly) => {
    if(anomaly.involvedObjects){
    const involvedObject = anomaly.involvedObjects[0]; // Get the first element of involvedObjects
    if (involvedObject) {
      const { type, visualId } = involvedObject;
      if (!typeCounts[type]) {
        typeCounts[type] = { count: 0, visualIds: [] };
      }
      typeCounts[type].count += 1;
      typeCounts[type].visualIds.push(visualId);
    }
  }
});

  return Object.entries(typeCounts).map(([type, data]) => ({
    type,
    count: data.count,
    visualIds: data.visualIds,
  }));
};

const BarChartWithPopup = (props: { anomaliesData: Anomaly[] }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<ChartData | null>(null);

  // Process anomalies data to extract chart data
  const data = processAnomaliesData(props.anomaliesData);
  console.log("data inside bar chart: ", data);
  const handleBarClick = (type: string) => {
    const clickedData = data.find((item) => item.type === type);
    if (clickedData) {
      setSelectedData(clickedData);
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h3></h3>
        <BarChart
          width={500}
          height={400}
          data={data}
          style={{ margin: '0 auto' }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="type" stroke="#fff" />
          <YAxis stroke="#fff" />
          {/* <Tooltip
            contentStyle={{
              backgroundColor: '#1d1d1d',
              borderRadius: '8px',
              color: '#fff',
              border: 'none',
            }}
          /> */}
        <Legend
  content={() => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#fff' }}>
      {data.map((entry, index) => (
        <div key={entry.type} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: COLORS[index % COLORS.length],
              marginRight: 5,
            }}
          ></div>
          <span>{entry.type}</span>
        </div>
      ))}
    </div>
  )}
/>
         <Bar
  dataKey="count"
  fill="#8884d8"
  onClick={(entry) => entry.type && handleBarClick(entry.type)} // Safely handle undefined
  cursor="pointer"
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Bar>

        </BarChart>
        <Modal
          title="Details"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedData ? (
            <div>
              <p>
                <strong>Type:</strong> {selectedData.type}
              </p>
              <p>
                <strong>Count:</strong> {selectedData.count}
              </p>
              <p>
                <strong>Visual IDs:</strong>
              </p>
              <ul>
                {selectedData.visualIds.map((id, index) => (
                  <li key={index}>{id}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default BarChartWithPopup;