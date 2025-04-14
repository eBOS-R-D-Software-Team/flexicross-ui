import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import risk from '../../assets/risk.jpg';
import analytics from '../../assets/analytics.jpg';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAnomaliesFromAPI } from '../../redux/slices/anomalySlice';
import { fetchDetectionsFromAPI } from '../../redux/slices/detectionSlice';

const Home: React.FC = () => {
    const anomalyData = useSelector((state: RootState) => state.anomalyData.anomalyData);
    let detectionData = useSelector((state: RootState) => state.detectionData.detectionData);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {

        const interval = setInterval(() => {
          
            dispatch(fetchAnomaliesFromAPI());
            dispatch(fetchDetectionsFromAPI());
           clearInterval(interval);
            
          }, 500);
      
          return () => clearInterval(interval);
        // Fetch anomalies when the component mounts
      
      }, []);
        
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Link to={'/risk/view-dashboards'}>

                        <Card style={{
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat", backgroundImage: `url(${risk
                                })`, height: 350
                        }}
                            hoverable
                        // cover={<img alt="example"  src={species}/>}
                        >
                            <h1 style={{
                                color: '#001529', fontWeight: 400
                            }}>Risk Assessment Dashboards</h1>

                        </Card>
                    </Link>
                </Col>
                <Col span={12}>
                    <Link to={'/visual-analytics/report'}>

                        <Card style={{
                            backgroundColor: "none",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat", backgroundImage: `url(${analytics
                                })`, height: 350
                        }}
                            hoverable
                        // cover={<img alt="example"  src={species}/>}
                        >
                            <h1 style={{
                                color: '#001529', fontWeight: 400
                            }}>Visual Analytics<br/> Report</h1>
                        </Card></Link>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
