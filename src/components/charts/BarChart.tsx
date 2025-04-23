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

// Updated color palette: primary dark blue and secondary light blue,
// along with a few complementary variants.
const COLORS = [
  '#002353', // primary dark blue
  '#32c7c1', // secondary light blue
  '#003f72', // dark blue variant
  '#2cc1ba', // complementary light blue variant
  '#001f3f', // deep dark blue
  '#5ad4d0', // lighter complementary blue
];

const processAnomaliesData = (anomaliesData: Anomaly[]): ChartData[] => {
  const typeCounts: Record<string, { count: number; visualIds: string[] }> = {};
  anomaliesData.forEach((anomaly) => {
    if (anomaly.involvedObjects) {
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
console.log(props.anomaliesData)
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
          colorBgContainer: '#fff',    // Light mode background
          colorText: '#002353',        // Primary dark blue text
          colorBorder: '#32c7c1',      // Secondary light blue border
        },
      }}
    >
      <div style={{ textAlign: 'center', color: '#002353' }}>
        <h3></h3>
        <BarChart
          width={500}
          height={400}
          data={data}
          style={{ margin: '0 auto' }}
          barCategoryGap="20%"
        >
          {/* Use a light grey grid for subtle separation */}
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="type" stroke="#002353" />
          <YAxis stroke="#002353" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              color: '#002353',
              border: '1px solid #32c7c1',
            }}
          />
          <Legend
            content={() => (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#002353' }}>
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
            fill="#002353" // Use primary color as default fill
            onClick={(entry) => entry.type && handleBarClick(entry.type)}
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
