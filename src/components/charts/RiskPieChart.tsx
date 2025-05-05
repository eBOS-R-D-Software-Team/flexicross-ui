import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Modal, Collapse } from 'antd';

const { Panel } = Collapse;

// COLORS array with six distinct colors that are compatible with your project colors and complementary choices.
const COLORS = [
  '#002353',  // dark blue (primary)
  '#32c7c1',  // light blue (primary)
  '#0a9396',  // bright teal
  '#f4a261',  // warm orange
  '#e9c46a',  // soft yellow
  '#003f73',  // deeper blue variant
];

// Helper to compute percentage
const getPercentage = (value: number, total: number): string => {
  if (total === 0) return '0';
  return ((value / total) * 100).toFixed(2);
};

interface RiskPieChartProps {
  data: { name: string; value: number }[];
  title: string;
  rawData: any[]; // full risk items
  flag: string;   // grouping flag: "severity", "riskType", etc.
}

// Custom Tooltip Component styled as requested.
const CustomTooltipPie = ({ active, payload, label, total }: any) => {
  if (
    active &&
    Array.isArray(payload) &&
    payload.length > 0 &&
    payload[0] &&
    payload[0].value != null
  ) {
    const percentage = getPercentage(payload[0].value, total);
    return (
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          color: '#002353',
          border: '1px solid #002353',
          fontSize: '13px',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0 0 4px 0', color: '#002353', fontWeight: 'bold' }}>
          {`${payload[0].name}`}
        </p>
        <p style={{ margin: '0 0 4px 0' }}>{`Total: ${payload[0].value}`}</p>
        <p style={{ margin: '0 0 4px 0' }}>{`Percentage: ${percentage}%`}</p>
      </div>
    );
  }
  return null;
};

// Helper to recursively render formatted content in collapsible panels.
const renderFormattedContent = (value: any): React.ReactNode => {
  if (Array.isArray(value)) {
    return (
      <ul style={{ margin: 0, paddingLeft: '1rem', listStyleType: 'disc' }}>
        {value.map((item, index) => (
          <li key={index}>{renderFormattedContent(item)}</li>
        ))}
      </ul>
    );
  } else if (typeof value === 'object' && value !== null) {
    return (
      <div style={{ marginLeft: '1rem' }}>
        {Object.entries(value).map(([k, v]) => (
          <div key={k} style={{ marginBottom: '0.25rem' }}>
            <strong style={{ color: '#002353' }}>{k}:</strong> {renderFormattedContent(v)}
          </div>
        ))}
      </div>
    );
  }
  return value?.toString();
};

const renderRiskItem = (item: any): React.ReactElement => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {Object.entries(item).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return (
            <div key={key} style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#002353' }}>{key}:</strong>
              <Collapse>
                <Panel header={`View ${key} details`} key={key}>
                  <div style={{ padding: '0.5rem', background: '#f9f9f9', borderRadius: '4px' }}>
                    {renderFormattedContent(value)}
                  </div>
                </Panel>
              </Collapse>
            </div>
          );
        } else {
          return (
            <div key={key} style={{ marginBottom: '0.25rem' }}>
              <strong style={{ color: '#002353' }}>{key}:</strong> {value?.toString()}
            </div>
          );
        }
      })}
    </div>
  );
};

const RiskPieChart: React.FC<RiskPieChartProps> = ({ data, title, rawData, flag }) => {
  const pieData = Array.isArray(data) ? data : [];
  const total = pieData.reduce((acc, cur) => acc + cur.value, 0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSliceDetails, setSelectedSliceDetails] = useState<{ name: string; items: any[] } | null>(null);

  // Handler for when a pie slice (Cell) is clicked.
  const handleSliceClick = (entry: any) => {
    const name = entry.name;
    const filteredItems = rawData.filter(item => {
      if (flag === 'severity') {
        return item.severity === name;
      } else if (flag === 'riskType') {
        return item.riskType === name;
      } else if (flag === 'probability') {
        return item.probability === name;
      }
      return false;
    });
    setSelectedSliceDetails({ name, items: filteredItems });
    setModalVisible(true);
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ color: '#002353' }}>{title}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ResponsiveContainer width="100%" aspect={1.6}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius="75%"
          dataKey="value"
          // label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              onClick={() => handleSliceClick(entry)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltipPie total={total} />} />
        <Legend
         layout="horizontal"
         verticalAlign="bottom"
         align="center"
        iconSize={10}
         wrapperStyle={{ color: '#002353', fontSize: 12 }}  /*  only colour/font; flex-wrap handled globally */
       />
      </PieChart>
      </ResponsiveContainer>
      </div>
      {selectedSliceDetails && (
        <Modal
  title={
    selectedSliceDetails && (() => {
      const sliceData = pieData.find(entry => entry.name === selectedSliceDetails.name);
      const sliceCount = sliceData ? sliceData.value : 0;
      const percentage = getPercentage(sliceCount, total);
      return (
        <span style={{ color: '#002353' }}>
          {`Details for ${selectedSliceDetails.name} (${sliceCount} cases, ${percentage}%)`}
        </span>
      );
    })()
  }
  visible={modalVisible}
  onCancel={() => setModalVisible(false)}
  footer={null}
  width={800}
>
  {selectedSliceDetails.items.map((item: any) => (
    <div
      key={item.id}
      style={{
        marginBottom: '1rem',
        padding: '1rem',
        border: '1px solid #f0f0f0',
        borderRadius: 4,
      }}
    >
      {renderRiskItem(item)}
    </div>
  ))}
</Modal>

      )}
    </div>
  );
};

export default RiskPieChart;
