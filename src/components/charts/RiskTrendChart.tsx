import React, { useMemo, useState } from 'react';
import { Card, Modal, Spin } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// COLORS array with six distinct colors (two project colors plus four complementary ones)
const COLORS = [
  '#002353',  // dark blue (primary)
  '#32c7c1',  // light blue (primary)
  '#0a9396',  // bright teal
  '#f4a261',  // warm orange
  '#e9c46a',  // soft yellow
  '#003f73',  // deeper blue variant
];

// Helper to format a Date as "DD-MM-YYYY"
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Defensive parseDate: expects a string in "DD-MM-YYYY" format.
const parseDate = (str: string): number => {
  if (!str) return 0;
  const parts = str.split('-');
  if (parts.length !== 3) return 0;
  const [day, month, year] = parts;
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
};

// Calculate trendline parameters (slope and intercept) for each raw risk type.
const useTrendParameters = (data: any[], rawRiskTypes: string[]) => {
  return useMemo(() => {
    const params: { [key: string]: { m: number; b: number } } = {};
    rawRiskTypes.forEach(type => {
      const items = data.filter(item => item.riskType === type);
      if (items.length < 2) return;
      const points = items.map(item => [parseDate(item.datetime), item.total]);
      const n = points.length;
      const sumX = points.reduce((a, p) => a + p[0], 0);
      const sumY = points.reduce((a, p) => a + p[1], 0);
      const sumXY = points.reduce((a, p) => a + p[0] * p[1], 0);
      const sumX2 = points.reduce((a, p) => a + p[0] * p[0], 0);
      const denominator = n * sumX2 - sumX * sumX;
      if (denominator === 0) return;
      const m = (n * sumXY - sumX * sumY) / denominator;
      const b_val = (sumY - m * sumX) / n;
      params[type] = { m, b: b_val };
    });
    return params;
  }, [data, rawRiskTypes]);
};

// Pivot raw data: group by datetime and sum totals for each riskType.
const pivotData = (data: any[]): any[] => {
  const pivot: { [datetime: string]: any } = {};
  data.forEach(item => {
    const dt = item.datetime;
    if (!pivot[dt]) {
      pivot[dt] = { datetime: dt };
    }
    if (pivot[dt][item.riskType] === undefined) {
      pivot[dt][item.riskType] = 0;
    }
    pivot[dt][item.riskType] += item.total;
  });
  return Object.values(pivot);
};

// Helper to render risk item details in the modal.
const renderRiskItem = (item: any): React.ReactElement => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {Object.entries(item).map(([key, value]) => (
        <div key={key} style={{ marginBottom: '0.25rem' }}>
          <strong style={{ color: '#002353' }}>{key}:</strong> {value?.toString()}
        </div>
      ))}
    </div>
  );
};

interface RiskItem {
  id: string;
  datetime: string; // normalized as dd-mm-yyyy
  riskType: string;
  total: number;
  // other properties...
}

interface RiskTrendChartProps {
  graphData: RiskItem[];
}

const RiskTrendChart: React.FC<RiskTrendChartProps> = ({ graphData }) => {
  // Normalize graphData: convert datetime to dd-mm-yyyy and ensure total is numeric.
  const normalizedGraphData = useMemo(() => {
    return graphData.map(item => {
      const d = new Date(item.datetime);
      return {
        ...item,
        datetime: isNaN(d.getTime()) ? item.datetime : formatDate(d),
        total: item.total !== undefined ? Number(item.total) : 1,
      };
    });
  }, [graphData]);

  // Determine the raw risk types.
  const rawRiskTypes = useMemo(() => {
    const set = new Set<string>();
    normalizedGraphData.forEach(item => set.add(item.riskType));
    return Array.from(set);
  }, [normalizedGraphData]);

  // Compute trend parameters for each raw risk type.
  const trendParameters = useTrendParameters(normalizedGraphData, rawRiskTypes);

  // Pivot the raw data.
  const pivotedRawData = useMemo(() => pivotData(normalizedGraphData), [normalizedGraphData]);

  // Extend the pivoted data with continuous trendline values.
  const pivotedDataWithTrend = useMemo(() => {
    return pivotedRawData.map(row => {
      const timestamp = parseDate(row.datetime);
      rawRiskTypes.forEach(type => {
        const trendKey = `${type} (Trend)`;
        if (trendParameters[type]) {
          row[trendKey] = trendParameters[type].m * timestamp + trendParameters[type].b;
        }
      });
      return row;
    });
  }, [pivotedRawData, rawRiskTypes, trendParameters]);

  // Compute risk type columns from the pivoted data.
  const riskTypeColumns = useMemo(() => {
    if (pivotedDataWithTrend.length === 0) return [];
    return Object.keys(pivotedDataWithTrend[0]).filter(key => key !== 'datetime');
  }, [pivotedDataWithTrend]);

  // Build riskTypeColorMap from raw risk types.
  const riskTypeColorMap = useMemo(() => {
    const map: { [key: string]: string } = {};
    rawRiskTypes.forEach((type, index) => {
      map[type] = COLORS[index % COLORS.length];
    });
    return map;
  }, [rawRiskTypes]);

  // State for modal popup.
  const [isRiskModalVisible, setIsRiskModalVisible] = useState(false);
  const [selectedRiskData, setSelectedRiskData] = useState<RiskItem[]>([]);

  // Handler for dot click on a line.
  const handleLineDotClick = (riskType: string, payload: any) => {
    if (!payload || !payload.payload) return;
    const clickedDate = payload.payload.datetime; // normalized dd-mm-yyyy
    const baseType = riskType.endsWith(" (Trend)") ? riskType.replace(" (Trend)", "") : riskType;
    const selectedItems = normalizedGraphData.filter(item =>
      item.riskType === baseType && item.datetime === clickedDate
    );
    setSelectedRiskData(selectedItems);
    setIsRiskModalVisible(true);
  };

  // Custom tooltip for the LineChart.
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length > 0) {
      return (
        <div
          style={{
            padding: '10px',
            border: '1px solid #002353',
            borderRadius: '8px',
            backgroundColor: '#fff',
            color: '#002353',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: 0, fontWeight: 'bold' }}>{label}</h4>
          {payload.map((item: any, index: number) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.name}</span>
              <b>{item.value}</b>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const modalTitle = useMemo(() => {
    if (selectedRiskData.length > 0) {
      const selected = selectedRiskData[0];
      const dayTotal = normalizedGraphData
        .filter(item => item.datetime === selected.datetime)
        .reduce((acc, cur) => acc + cur.total, 0);
      const percentage = ((selected.total / dayTotal) * 100).toFixed(0);
      return `Details for ${selected.riskType} on ${selected.datetime} (${selected.total} cases, ${percentage}%)`;
    }
    return "";
  }, [selectedRiskData, normalizedGraphData]);

  return (
    <div>
      <Card title="Risk Trend">
        {graphData.length === 0 ? <Spin /> : (
          <LineChart
            width={1300}
            height={500}
            data={pivotedDataWithTrend}
            margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" tickFormatter={(val: string) => val} />
            <YAxis />
            <Tooltip content={renderCustomTooltip} />
            <Legend />
            {riskTypeColumns.map((riskType, index) => {
              const baseType = riskType.endsWith(" (Trend)") ? riskType.replace(" (Trend)", "") : riskType;
              const color = riskTypeColorMap[baseType] || COLORS[0];
              return (
                <Line
                  key={riskType}
                  type="monotone"
                  dataKey={riskType}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 3, onClick: (e: any, payload: any) => handleLineDotClick(riskType, payload) }}
                  activeDot={{ r: 6, onClick: (e: any, payload: any) => handleLineDotClick(riskType, payload) }}
                  strokeDasharray={riskType.endsWith("(Trend)") ? '2,4' : undefined}
                />
              );
            })}
          </LineChart>
        )}
      </Card>
      <Modal
        title={<span style={{ color: '#002353' }}>{modalTitle}</span>}
        visible={isRiskModalVisible}
        onCancel={() => setIsRiskModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedRiskData.map(item => (
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
    </div>
  );
};

export default RiskTrendChart;
