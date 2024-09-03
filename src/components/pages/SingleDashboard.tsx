// MyComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { getDashboardDataById } from '../../redux/slices/riskDataSlice';
import { Card, Col, Layout, Row, Spin, Table, Tag } from 'antd';
import { Bar, Heatmap } from '@ant-design/charts';
import { text } from 'stream/consumers';
import { AnyARecord } from 'dns';
import { Pie } from '@ant-design/plots';
import { countOccurrences, countRiskTypes } from '../../hooks/useRiskTypeCount';
import StatsGraph from '../shared/Graphs/StatsGraph';

type RouteParams = {
    id: string;
}

const SingleDashboard: React.FC = () => {
    // Retrieve the 'id' parameter from the route
    const { id } = useParams<RouteParams>();
    const dispatch = useDispatch();
    const selectedDashboard = useSelector((state: RootState) => state.dashboardData.selectedDashboard);
    const [graphData, setGraphData] = React.useState();
    const [statsData, setStatsData] = React.useState<any>();

    useEffect(() => {
        dispatch(getDashboardDataById(id));
        // console.log(countRiskTypes(graphData));            
    }, [id]);
    useEffect(() => {
        console.log('dsj', selectedDashboard);
        setGraphData(selectedDashboard?.data);
        if (graphData) {
            console.log(countOccurrences(graphData));
            setStatsData(countOccurrences(graphData));
        }

    }, [selectedDashboard, graphData]);
    const config = {
        theme: "classicDark",

        xField: 'labelName',
        yField: 'value',
        paddingRight: 0,
        style: {
            maxWidth: 60,
        },
        markBackground: {
            label: {
                text: (originData: any) => {
                    console.log(originData);
                    return `${(originData.originData.value / 10) * 100}% | ${originData.originData.value}`;
                },
                position: 'left',
                dx: 180,
                style: {
                    fill: '#000000',
                    color: '#000000',
                    fillOpacity: 1,
                    fontSize: 16,
                },
            },
            style: {
                textAlign: 'center',
                fill: '#ffffff',
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
        // interaction: {
        //     elementHighlight: true,
        //     brushFilter: true
        // },
        // slider: { y: true, x: true },

    };

    const customLabel = (_: any, datum: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, background: 'rgba(0,0,0,0.4)', marginRight: '8px', borderRadius: '50%' }} />
            <Tag>
                <b>{datum.labelName} - {datum.value}</b>
            </Tag>
        </div>
    );
    const configPie = {
        theme: "classicDark",

        angleField: 'value',
        colorField: 'labelName',
        label: {
            text: 'labelName',
            position: 'inside',
            textAlign: 'left',

            render: customLabel,
        },
        legend: false,
    };
    const configHeat = {
        autoFit: true,
        height: 800,
        theme: "classicDark",

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
            pointerEvents: 'none'
        },
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
        }, {
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
                        <StatsGraph data={statsData.riskType[key]} total={statsData.statistics['total']} title={key.replace(/([A-Z])/g, ' $1').trim()} />
                    </Col>
                ))}
            </Row>
            <Row gutter={24} style={{ marginBottom: 32 }}>
                <Col span={24}>
                    <Card>
                        {graphData && <Table columns={columns} dataSource={graphData} />}  </Card>     </Col>

            </Row>

            <Row gutter={24}>
                <Col span={12} >

                    <Card title={'Risk Level by Type'}>
                        {graphData === undefined && <Spin></Spin>}
                        {graphData && <Bar data={countRiskTypes(graphData, 'riskType')} {...config} />
                        }

                    </Card>                    </Col>
                <Col span={12} >

                    <Card title={'Risk Status'}>
                        {graphData === undefined && <Spin></Spin>}
                        {graphData && <Pie data={countRiskTypes(graphData, 'severity')} {...configPie} />
                        }

                    </Card>                    </Col>
                <Col span={24} >

                    <Card style={{ marginTop: 16 }} title={'Risk Matrix'}>
                        {graphData === undefined && <Spin></Spin>}

                        {graphData && <Heatmap {...configHeat} />}
                    </Card>                    </Col>

            </Row>
        </Layout>
    );
};

export default SingleDashboard;
