// MyComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { getDashboardDataById } from '../../redux/slices/riskDataSlice';
import { Card, Col, Layout, Row, Spin, Table, Tag } from 'antd';
import { Bar, Heatmap } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import { countOccurrences, countRiskTypes, getAnomalyLineColor } from '../../hooks/useRiskTypeCount';
import StatsGraph from '../shared/Graphs/StatsGraph';

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

  useEffect(() => {
    dispatch(getDashboardDataById(id));
  }, [id, dispatch]);

  useEffect(() => {
    setGraphData(selectedDashboard?.data);
    if (graphData) {
      setStatsData(countOccurrences(graphData));
    }
  }, [selectedDashboard, graphData]);

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
        {statsData && Object.keys(statsData.riskType).map((key) => (
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
        <Col span={12}>
          <Card title={'Risk Level by Type'}>
            {graphData === undefined && <Spin />}
            {graphData && <Bar data={countRiskTypes(graphData, 'riskType')} {...config} />}
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'Risk Status'}>
            {graphData === undefined && <Spin />}
            {graphData && <Pie data={countRiskTypes(graphData, 'severity')} {...configPie} />}
          </Card>
        </Col>
        <Col span={24}>
          <Card style={{ marginTop: 16 }} title={'Risk Matrix'}>
            {graphData === undefined && <Spin />}
            {graphData && <Heatmap {...configHeat} />}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default SingleDashboard;
