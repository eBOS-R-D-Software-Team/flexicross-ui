import React from 'react';
import { Card, Row, Col } from 'antd';
import species from '../../assets/species.png';
import habitat from '../../assets/habitat.png';
import indicators from '../../assets/indicators.jpg';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Link to={'/risk/view-dashboards'}>

                        <Card style={{
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat", backgroundImage: `url(${species
                                })`, height: 350
                        }}
                            hoverable
                        // cover={<img alt="example"  src={species}/>}
                        >
                            <h1 style={{
                                color: 'white', fontWeight: 100
                            }}>Risk Assessment Dashboards</h1>

                        </Card>
                    </Link>
                </Col>
                <Col span={12}>
                    <Link to={'/visual-analytics/report'}>

                        <Card style={{
                            backgroundColor: "none",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat", backgroundImage: `url(${habitat
                                })`, height: 350
                        }}
                            hoverable
                        // cover={<img alt="example"  src={species}/>}
                        >
                            <h1 style={{
                                color: 'white', fontWeight: 100
                            }}>Visual Analytics Report</h1>
                        </Card></Link>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
