import React, { useState } from 'react';
import { Col, Layout, Menu, MenuProps, Row,Image } from 'antd';
import { Link } from 'react-router-dom';
import { PieChartOutlined, DesktopOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/guarden.png';
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    to?: string,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label: to ? <Link to={to}>{label}</Link> : label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', '4', <PieChartOutlined />, '/'),
    // getItem('Risk Analysis', '4', <DesktopOutlined />, '', [
    //     getItem('Observations', '4', undefined, '/species/observations'),
    //     getItem('Predictions', '5', undefined, '/species/predictions'),
    // ]), 
    getItem('Dashboards', '3', <DesktopOutlined />, '/dashboards'),
];
const Sidebar: React.FC<any> = (menu)  => {
    console.log(menu.menu);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible  collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
                            {/* <Image src={logo} alt="logo" width={150} style={{ mixBlendMode: 'plus-lighter' }} preview={false} /> */}
                        </Col>
                    </Row>
                </div>
            </div>      
            <Menu theme="dark" defaultSelectedKeys={[menu.menu]} mode="inline" items={items} />
        </Sider>
    );
};

export default Sidebar;
