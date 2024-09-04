import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDashboardData, clearDashboardData } from '../../redux/slices/riskDataSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Button, Card, Col, Layout, Row, Tag, Typography } from 'antd';
import moment from 'moment';
import { DashboardData } from '../../interfaces/dashboardData';
import { PlusOutlined, ExclamationCircleOutlined, DownCircleOutlined, CloseCircleOutlined, MinusCircleOutlined, UpCircleOutlined } from '@ant-design/icons';



const Dashboards: React.FC = () => {
    const dispatch = useDispatch();
    const dashboardData = useSelector((state: RootState) => state.dashboardData.dashboardData);
    useEffect(() => {
        // console.log(dashboardData);
        return () => {
        };
    }, []);
    // const addData = () => {
    //   const newData: Dashboard = { datetime: new Date(), filters: ['filter1', 'filter2'] };
    //   dispatch(setDashboardData(newData));
    // };
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);

        // Define the options for formatting
        const options = {
            day: '2-digit', // 20
            month: 'short', // Aug
            hour: '2-digit', // 10
            minute: '2-digit', // 06
        };

        // Format the date
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit', // 20
            month: 'short', // Aug
            hour: '2-digit', // 10
            minute: '2-digit', // 06
        }).format(date);
    };
    const clearData = () => {
        dispatch(clearDashboardData());
    };
    const addData = () => {
        dispatch(clearDashboardData());
    };
    return (
        <Layout>
            <Card title={<Row gutter={24} style={{ marginBottom: 16, marginTop: 16 }}>
                <Col span={12} >
                    <Button type='primary' onClick={addData}>Add Dashboard</Button>

                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button onClick={clearData}>Clear Data</Button>

                </Col>
            </Row>}>

                <Row gutter={24}>
                    {dashboardData.map((item: DashboardData, index: number) => (
                        <Col span={8} key={index} style={{ marginBottom: 16 }}>
                            <Link to={`/risk/dashboard/${item.id}`}>

                                <Card spellCheck title={<div>Dashboard {item.id} - <Tag color='blue'>{formatDate(item.datetime)}</Tag></div>} bordered={true} style={{ minHeight: 300 }}>
                                    <Row>                                    <Col style={{ marginBottom: 16 }}>
                                         <Typography.Paragraph strong>Type: <Tag style={{ marginLeft: 8 }}>Risk</Tag></Typography.Paragraph>
                                        {item.filters.severity || item.filters.riskType &&<><Typography.Paragraph strong>Filters:

                                            {item.filters.severity &&
                                                <Tag style={{ marginLeft: 8, marginBottom: 16 }} icon={item.filters.severity === 'NoSeverity' ? <CloseCircleOutlined /> : item.filters.severity === 'LowSeverity' ? <DownCircleOutlined /> : item.filters.severity === 'Occasional' ? <MinusCircleOutlined /> : item.filters.severity === 'HighlyProbable' ? <UpCircleOutlined /> : <ExclamationCircleOutlined />} color={item.filters.severity === 'NoSeverity' ? 'green' : item.filters.severity === 'LowSeverity' ? 'blue' : item.filters.severity === 'Occasional' ? 'yellow' : item.filters.severity === 'HighlyProbable' ? 'red' : 'warning'}> {item.filters.severity ? item.filters.severity.toString().split('|').join(', ') : ''}</Tag>
                                            }
                                            {item.filters.riskType &&

                                                <Tag style={{ marginLeft: 8, marginBottom: 16 }} color={item.filters.riskType === 'HumanTrafficking' ? '#000000' : item.filters.riskType === 'Contraband' ? '#8c8c8c' : item.filters.riskType === 'UTurnVehicle' ? '#262626' : item.filters.riskType === 'SuspiciousDrivingPattern' ? '#a8071a' : 'warning'}> {item.filters.riskType ? item.filters.riskType.toString().split('|').join(', ') : ''}</Tag>
                                            }                                    </Typography.Paragraph></>}
                                    </Col></Row>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row></Card>
        </Layout>
    );
};

export default Dashboards;
