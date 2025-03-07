import React, { useState } from 'react';
import { Card, Spin, Modal, Collapse } from 'antd';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Text,
} from 'recharts';

const { Panel } = Collapse;

// Define the shape of each chart data item
interface ChartDataItem {
  riskType: string;
  total: number;
  HighSeverity?: number;
  MediumSeverity?: number;
  LowSeverity?: number;
  NoSeverity?: number;
  NegligableSeverity?: number;
  PotentialOBUMisoperation?: number;
}

// Define component props (rawData is used for the popup details)
interface StackedBarChartProps {
  data: ChartDataItem[];
  loading: boolean;
  rawData: any[];
}

// Define the severity order (most severe first)
const severityOrder: (keyof Omit<ChartDataItem, 'riskType' | 'total'>)[] = [
  'HighSeverity',
  'MediumSeverity',
  'LowSeverity',
  'NoSeverity',
  'NegligableSeverity',
  'PotentialOBUMisoperation',
];

// Updated severity colors with distinct values:
const severityColors: { [key in keyof Omit<ChartDataItem, 'riskType' | 'total'>]: string } = {
  HighSeverity: "#c42021",
  MediumSeverity: "#6c0e23",
  LowSeverity: "#ffad69",
  NoSeverity: "#FAE151",             // new color for NoSeverity
  NegligableSeverity: "#79addc",      // changed as requested
  PotentialOBUMisoperation: "#52BA5E",
};

// Custom Tooltip component – white background and using severity colors
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '0.5rem',
          border: '1px solid #f0f0f0',
          background: 'white',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold', color: '#002353' }}>{label}</p>
        {payload.map((entry: any, index: number) => {
          const severityColor = severityColors[entry.name as keyof typeof severityColors] || '#002353';
          return (
            <p key={`item-${index}`} style={{ margin: 0, color: severityColor }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

// Helper to render risk item details.
// If a property is an array or an object, it is rendered in a collapsible panel.
const renderRiskItem = (item: any): React.ReactElement => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {Object.entries(item).map(([key, value]) => {
        if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
          return (
            <div key={key} style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#002353' }}>{key}:</strong>
              <Collapse>
                <Panel header={`View ${key} details`} key="1">
                  <pre style={{ whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(value, null, 2)}
                  </pre>
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

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, loading, rawData }) => {
  // State for modal visibility and selected risk segment details
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRiskDetails, setSelectedRiskDetails] = useState<{
    riskType: string;
    severity: keyof Omit<ChartDataItem, 'riskType' | 'total'>;
    items: any[];
  } | null>(null);

  // Handler for clicking on a bar segment.
  // Filters rawData to get risk items with matching riskType and severity.
  const handleBarClick = (
    dataPoint: any,
    severity: keyof Omit<ChartDataItem, 'riskType' | 'total'>
  ) => {
    const riskType = dataPoint.payload.riskType;
    const items = rawData.filter(
      (item) => item.riskType === riskType && item.severity === severity
    );
    setSelectedRiskDetails({ riskType, severity, items });
    setModalVisible(true);
  };

  return (
    <>
      <Card
        title="Risk by Category"
        style={{
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 8,
          margin: '1rem 0',
        }}
      >
        {loading && <Spin />}
        {data && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <XAxis
                type="number"
                domain={[0, 'dataMax']}
                tick={{ fill: '#002353', fontSize: 14 }}
              />
              <YAxis
                type="category"
                dataKey="riskType"
                tick={{ fill: '#002353', fontSize: 14 }}
              />
                            {/* <Tooltip cursor={{fill: 'white'}} content={<CustomTooltip />} /> */}

              <Tooltip  content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#002353', fontSize: 14 }} />
              {severityOrder.map((severity) => (
                <Bar
                  key={severity}
                  dataKey={severity}
                  stackId="a"
                  fill={severityColors[severity]}
                  style={{ cursor: 'pointer' }}
                  onClick={(dataPoint: any) => handleBarClick(dataPoint, severity)}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Modal
        title={
          selectedRiskDetails ? (
            <span style={{ color: '#002353' }}>
              {`Details for ${selectedRiskDetails.riskType} - ${selectedRiskDetails.severity}`}
            </span>
          ) : (
            ''
          )
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedRiskDetails &&
          selectedRiskDetails.items.map((item) => (
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
    </>
  );
};

export default StackedBarChart;
