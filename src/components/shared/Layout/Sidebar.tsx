import React, { useState } from 'react';
import { Col, Layout, Menu, MenuProps, Row, Modal, Select, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { PieChartOutlined, DesktopOutlined, LogoutOutlined } from '@ant-design/icons';
import { useKeycloak } from '@react-keycloak/web';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    to?: string,
    onClick?: () => void,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label: to ? <Link to={to}>{label}</Link> : label,
        onClick,
    } as MenuItem;
}

const Sidebar: React.FC<any> = (menu) => {
    const [collapsed, setCollapsed] = useState(false);
    const { keycloak } = useKeycloak();
    const navigate = useNavigate(); // Needed for programmatic nav
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
    
    const items: MenuItem[] = [
        getItem('Home', '1', <DesktopOutlined />, '/'),

        getItem('Risk Analysis', '', <DesktopOutlined />, '', undefined, [
            getItem('Create Dashboard', '2', <PieChartOutlined />, '/risk/create-dashboard'),
            getItem('Dashboards', '4', <DesktopOutlined />, '/risk/view-dashboards'),
        ]),

        getItem('Visual Analytics', '6', <DesktopOutlined />, undefined, () => {
            const storedGroups = JSON.parse(localStorage.getItem("usergroups") || "[]");
            if (storedGroups.length > 1) {
              setIsModalVisible(true); // show modal
            } else {
              navigate('/visual-analytics/report');
            }
          }),
          
        // ✅ Logout option
        getItem('Logout', 'logout', <LogoutOutlined />, undefined, () => {
            keycloak.logout({
                redirectUri: window.location.origin, // back to app's root
            });
        }),
    ];

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div>
                <div
                    style={{
                        height: 100,
                        padding: 20,
                        borderBottomRightRadius: 10
                    }}
                >
                    <Row justify="space-around" align="middle">
                        <Col span={20}>
                            {/* Logo here */}
                        </Col>
                    </Row>
                </div>
            </div>
            <Menu theme="dark" defaultSelectedKeys={[menu.menu]} mode="inline" items={items} />
            <Modal
  title="Multiple Event Groups"
  visible={isModalVisible}
  onOk={() => {
    if (!selectedGroup) {
      message.warning("Please select a group.");
      return;
    }
    localStorage.setItem("usergroup", selectedGroup);
    setIsModalVisible(false);
    navigate('/visual-analytics/report');
  }}
  onCancel={() => setIsModalVisible(false)}
  okText="Continue"
>
  <p>You have access to multiple anomalies/detections events. Please specify which event you want to visualize:</p>
  <Select
    style={{ width: '100%' }}
    placeholder="Select a group"
    onChange={(value) => setSelectedGroup(value)}
  >
    {(JSON.parse(localStorage.getItem("usergroups") || "[]") as string[]).map(group => (
      <Select.Option key={group} value={group}>{group}</Select.Option>
    ))}
  </Select>
</Modal>

        </Sider>
    );
};

export default Sidebar;
