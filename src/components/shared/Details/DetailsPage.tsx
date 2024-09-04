
          import React, { useEffect } from 'react';
          import { useParams, useNavigate } from 'react-router-dom';
          import { Button, Card, Col, Collapse, Descriptions, Layout, Row, Spin, Tag } from 'antd';
          import { useDispatch, useSelector } from 'react-redux';
          import { getRiskById } from '../../../redux/slices/riskDataSlice';
          import { getAnomalyDataById } from '../../../redux/slices/anomalySlice';
          import { getDetectionDataById } from '../../../redux/slices/detectionSlice';
          import { RootState } from '../../../redux/store';
          import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
          import MapComponent from '../Map/MapComponent';
          const { Panel } = Collapse;
          
          const DetailPage: React.FC = () => {
            const { type, id } = useParams<{ type: string, id: string }>();
            const navigate = useNavigate();
            const dispatch = useDispatch();
          
            const selectedAnomaly = useSelector((state: RootState) => state.anomalyData.selectedAnomaly);
            const selectedRisk = useSelector((state: RootState) => state.dashboardData.selectedRisk);
            const selectedDetection = useSelector((state: RootState) => state.detectionData.selectedDetection);
          
            const [objectData, setObjectData] = React.useState<any>(null);
          
            useEffect(() => {
              if (type === 'anomaly') {
                dispatch(getAnomalyDataById(id));
              }
              if(selectedAnomaly&&selectedAnomaly?.involvedObjects){
                setObjectData(selectedAnomaly?.involvedObjects);
          
          }
            }, [selectedAnomaly]);
          
            useEffect(() => {
              if (type === 'detection') {
                dispatch(getDetectionDataById(id));
              }
              if(selectedDetection&&selectedDetection?.involvedObjects){
                setObjectData(selectedDetection?.involvedObjects);
          
          }
            }, [selectedDetection]);
          
            useEffect(() => {
              if (type === 'risk') {
                dispatch(getRiskById(id));
                
              }
              if(selectedRisk&&selectedRisk?.involvedObjects){
                setObjectData(selectedRisk?.involvedObjects);
          
          }
          
            }, [selectedRisk]);
          const onBack = () => {
            if(type=='anomaly' || type =='detection'){
              navigate('/visual-analytics/report')
            } else {
              navigate('/risk/create-dashboard')

            }
          }
            return (
              <Layout style={{ padding: '24px' }}>
                <Row gutter={24} style={{ marginBottom: 32 }}>
                  <Col span={24}>
                    <Button onClick={onBack}>Back</Button> {/* Back button */}
                  </Col>
                </Row>
                <Row gutter={24} style={{ marginBottom: 32 }}>
                  <Col span={24}>
                    <Card title={`${(type) ? type.charAt(0).toUpperCase() + type.slice(1) : ''} Details`} style={{ marginTop: '16px' }}>
                      {selectedRisk && type === 'risk' && <>
                        <Tag color='red'>{selectedRisk.riskType}</Tag>
                        <Tag color='orange'>{selectedRisk.riskSeverity}</Tag>
                        <Tag color='sucess'>{selectedRisk.riskStatus}</Tag>
                      </>
          
                      }
                      {selectedAnomaly && type === 'anomaly' && <>
                        <Tag color='red' >{selectedAnomaly.id}</Tag>
                        <Tag color='orange' >{selectedAnomaly.anomalyType}</Tag>
                      </>
                      }
                      {(selectedDetection && type === 'detection') &&
                        <>
                          <Tag color='red'>{selectedDetection.id}</Tag>
                          <Tag color='orange'>{selectedDetection.detectionType}</Tag></>
                      }
                    </Card>
                  </Col>
                  </Row>
                  <Row gutter={24} style={{ marginBottom: 32 }}>
                    <Col span={24}>
          
              {objectData && (
            <Card title="Involved Objects" style={{ marginTop: '16px' }}>
              <Collapse accordion>
                {objectData.map((item: any, index: number) => (
                  <Panel header={`${item.name? item?.type+' '+item.name : item?.type || 'Unknown Type'} `} key={index}>
                    <Descriptions bordered column={1}>
                      {item?.name && (
                        <Descriptions.Item label="Name">
                          {item.name}
                        </Descriptions.Item>
                      )}
                      {item?.surname && (
                        <Descriptions.Item label="Surname">
                          {item.surname}
                        </Descriptions.Item>
                      )}
                      {item?.aliases && item.aliases.length > 0 && (
                        <Descriptions.Item label="Aliases">
                          {item.aliases.join(', ')}
                        </Descriptions.Item>
                      )}
                      {item?.gender && (
                        <Descriptions.Item label="Gender">
                          {item.gender}
                        </Descriptions.Item>
                      )}
                      {item?.birthday && (
                        <Descriptions.Item label="Birthday">
                          {new Date(item.birthday).toLocaleDateString()}
                        </Descriptions.Item>
                      )}
                      {item?.height && (
                        <Descriptions.Item label="Height">
                          {item.height} cm
                        </Descriptions.Item>
                      )}
                      {item?.eye_color && (
                        <Descriptions.Item label="Eye Color">
                          {item.eye_color}
                        </Descriptions.Item>
                      )}
                      {item?.nationality && (
                        <Descriptions.Item label="Nationality">
                          {item.nationality}
                        </Descriptions.Item>
                      )}
                      {item?.location?.properties?.detectionConfidence !== undefined && (
                        <Descriptions.Item label="Detection Confidence">
                          {item.location.properties.detectionConfidence.toFixed(2)}
                        </Descriptions.Item>
                      )}
                      {item?.location?.properties?.trackingConfidence !== undefined && (
                        <Descriptions.Item label="Tracking Confidence">
                          {item.location.properties.trackingConfidence.toFixed(2)}
                        </Descriptions.Item>
                      )}
                      {item?.location?.geometry?.coordinates ? (
                        <Descriptions.Item label="Coordinates">
                          Latitude: {item.location.geometry.coordinates[1]}, Longitude: {item.location.geometry.coordinates[0]}
                        </Descriptions.Item>
                      ) : (
                        <Descriptions.Item label="Coordinates">
                          Coordinates not available
                        </Descriptions.Item>
                      )}
                    </Descriptions>

                    {item?.location?.geometry?.coordinates && (
            <MapComponent locations={[item?.location]}  center={item.location.geometry.coordinates}/>
          )}

                  </Panel>
                ))}
              </Collapse>
            </Card>
          )}
          
          
                    </Col>
                  </Row>
              </Layout >
            );
          };
          
          export default DetailPage;
          