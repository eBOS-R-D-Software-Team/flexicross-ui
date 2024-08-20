import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDashboardData, clearDashboardData } from '../../redux/slices/riskDataSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Card, Col, Row } from 'antd';
import moment from 'moment';
import { DashboardData } from '../../interfaces/dashboardData';



const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const dashboardData = useSelector((state: RootState) => state.dashboardData.dashboardData);

    // const addData = () => {
    //   const newData: Dashboard = { datetime: new Date(), filters: ['filter1', 'filter2'] };
    //   dispatch(setDashboardData(newData));
    // };

    const clearData = () => {
      dispatch(clearDashboardData());
    };

    return (
        <div>
            <Row gutter={16}>
                {dashboardData.map((item: DashboardData, index: number) => (
                    <Col span={12} key={index}>
                        <Card title={`Datetime: ${moment(item.datetime).format('YYYY-MM-DD HH:mm:ss')}`} bordered={true}>
                            <p>Filters:</p>
                            <ul>
                                {item.filters.map((filter, filterIndex) => (
                                    <li key={filterIndex}>{filter}</li>
                                ))}
                            </ul>
                        </Card>
                    </Col>
                ))}
            </Row>
            <button onClick={clearData}>Clear Data</button>
        </div>
    );
};

export default Dashboard;
