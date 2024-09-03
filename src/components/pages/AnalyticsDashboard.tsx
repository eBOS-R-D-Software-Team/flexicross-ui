import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Layout, Modal, Spin } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { DualAxes, Pie } from '@ant-design/charts';
import { anomalyDummy } from './anomalydummy';
import { countRiskTypes, processData } from '../../hooks/useRiskTypeCount';
import DataTableComponent from '../shared/Datatable/DataTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { detectionDummy } from '../../redux/slices/data/dummyDetections';

const AnalyticsDashboard: React.FC = () => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalTitle, setModalTitle] = useState<string>('');
    const dispatch = useDispatch();
    const anomalyData = useSelector((state: RootState) => state.anomalyData.anomalyData);
    const detectionData = useSelector((state: RootState) => state.detectionData.detectionData);

    const [statsData, setStatsData] = useState<any>();
    const [tinyData, setTinyData] = useState<any>();
    useEffect(() => {
        console.log(anomalyData);
        if(anomalyData){
            setStatsData(processData(anomalyData));
            setTinyData(processData(anomalyData));

        }
        return () => {
        };
    }, [anomalyData]);
    const openModal = (title: string, content: React.ReactNode) => {
        setModalTitle(title);
        setModalContent(content);
        setModalVisible(true);
    };

    const configPie = {
        theme: "classicDark",
        angleField: 'value',
        colorField: 'labelName',
        legend: true,
    };

    const config = {
        theme: 'classicDark',
        xField: 'time',
        legend: true,
        children: [
            {
                type: 'line',
                yField: 'type',
                style: {
                    stroke: '#5B8FF9',
                    lineWidth: 2,
                },
                axis: {
                    y: {
                        title: 'type',
                        style: { titleFill: '#5B8FF9' },
                    },
                },
            },
            {
                type: 'line',
                yField: 'total',
                style: {
                    stroke: '#5AD8A6',
                    lineWidth: 2,
                },
                axis: {
                    y: {
                        position: 'right',
                        title: 'Total',
                        style: { titleFill: '#5AD8A6' }
                    },
                },
            },
        ],
    };

    return (
        <Layout>
            <Row gutter={24} style={{ marginBottom: 32 }}>
                <Col span={12}>
                    <Card
                        title="Filter Anomalies"
                        extra={<FullscreenOutlined onClick={() => openModal('Filter Anomalies', <DataTableComponent data={anomalyDummy} flag={'anomaly'} fullscreen={true} />)} />}
                    >
                        <DataTableComponent data={anomalyDummy} flag={'anomaly'} fullscreen={false}/>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        title="Filter Detections"
                        extra={<FullscreenOutlined onClick={() => openModal('Filter Detections', <DataTableComponent data={detectionDummy} flag={'detection'} fullscreen={true} />)} />}
                    >
                        <DataTableComponent data={detectionDummy} flag={'detection'}fullscreen={false} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginBottom: 32 }}>
                <Col span={24}>
                    <Card
                        title="Anomaly Trend"
                        extra={<FullscreenOutlined onClick={() => openModal('Anomaly Trend', <DualAxes width={1300} data={statsData} {...config} />)} />}
                    >
                        {statsData === undefined && <Spin />}
                        {statsData && <DualAxes width={1300} style={{ textAlign: 'center', display: 'flex' }} data={statsData} {...config} />}
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginBottom: 32 }}>
                <Col span={12}>
                    <Card
                        title="Anomaly Status"
                        extra={<FullscreenOutlined onClick={() => openModal('Anomaly Status', <Pie width={650} height={500} data={countRiskTypes(tinyData, 'anomalyType')} {...configPie} />)} />}
                    >
                        {tinyData === undefined && <Spin />}
                        {tinyData && <Pie style={{ textAlign: 'center', display: 'flex' }} width={650} height={500} data={countRiskTypes(tinyData, 'anomalyType')} {...configPie} />}
                    </Card>
                </Col>
            </Row>

            <Modal
                title={modalTitle}
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
                width="100%"
                style={{ top: 0 }}
                bodyStyle={{ height: '100vh', padding: 0 }}
            >
                {modalContent}
            </Modal>
        </Layout>
    );
};

export default AnalyticsDashboard;
