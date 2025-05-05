/* ------------------------------------------------------------------ */
/*  components/shared/Layout/Sidebar.tsx                              */
/* ------------------------------------------------------------------ */

import React, { useState } from 'react';
import {
  Layout,
  Menu,
  MenuProps,
  Modal,
  Select,
  message,
  Row,
  Col,
} from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
// import { useKeycloak } from '@react-keycloak/web';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  to?: string,
  onClick?: () => void,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: to ? <Link to={to}>{label}</Link> : label,
    onClick,
  } as MenuItem;
}

/* ------------------------------------------------------------------ */
/*  Sidebar component                                                 */
/* ------------------------------------------------------------------ */

interface SidebarProps {
  menu: string;               // key of the item you want highlighted
}

const Sidebar: React.FC<SidebarProps> = ({ menu }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  /* modal for “choose user group” */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGroup,  setSelectedGroup]  = useState<string>();

  /* helper invoked by every VA link */
  const navigateWithGroupGuard = (target: string) => {
    const storedGroups: string[] =
      JSON.parse(localStorage.getItem('usergroups') || '[]');

    if (storedGroups.length > 1 && !localStorage.getItem('usergroup')) {
      setIsModalVisible(true);
      // remember where we wanted to go
      (window as any).__va_target = target;
    } else {
      navigate(target);
    }
  };

  /* -------------------------  MENU STRUCTURE  ------------------------- */

  const items: MenuItem[] = [
    /* HOME */
    getItem('Home', '1', <DesktopOutlined />, '/'),

    /* ─── RISK ANALYSIS ─────────────────────────────────────────────── */
    getItem('Risk Analysis', 'riskRoot', <DesktopOutlined />, undefined, undefined, [
      getItem('Create Dashboard', '2', <PieChartOutlined />, '/risk/create-dashboard'),
      getItem('Dashboards',       '4', <DesktopOutlined />, '/risk/view-dashboards'),
    ]),

    /* ─── VISUAL ANALYTICS  (NEW) ───────────────────────────────────── */
    getItem('Visual Analytics', 'vaRoot', <DesktopOutlined />, undefined, undefined, [
      getItem(
        'Create Dashboard',
        '6a',
        <PieChartOutlined />,
        undefined,
        () => navigateWithGroupGuard('/visual/create-dashboard'),
      ),
      getItem(
        'Dashboards',
        '6b',
        <DesktopOutlined />,
        undefined,
        () => navigateWithGroupGuard('/visual/view-dashboards'),
      ),
    ]),

    /* LOGOUT */
    getItem('Logout', 'logout', <LogoutOutlined />, undefined, () => {
      // keycloak.logout({ redirectUri: window.location.origin });
    }),
  ];

  /* -------------------------  RENDER  ------------------------- */

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="dark"
    >
      {/* Logo / brand block */}
      <div style={{ height: 100, padding: 20 }}>
        <Row justify="space-around" align="middle">
          <Col span={20}>{/* put your logo here */}</Col>
        </Row>
      </div>

      <Menu
        mode="inline"
        theme="dark"
        items={items}
        defaultSelectedKeys={[menu]}
      />

      {/* MODAL: choose user group */}
      <Modal
        title="Multiple Event Groups"
        open={isModalVisible}
        okText="Continue"
        onOk={() => {
          if (!selectedGroup) {
            message.warning('Please select a group.');
            return;
          }
          localStorage.setItem('usergroup', selectedGroup);
          setIsModalVisible(false);

          // navigate to the stored target
          navigate((window as any).__va_target || '/visual/create-dashboard');
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          You have access to multiple anomaly/detection event groups. Choose the
          one you want to visualise:
        </p>
        <Select
          style={{ width: '100%' }}
          placeholder="Select a group"
          onChange={setSelectedGroup}
        >
          {(JSON.parse(localStorage.getItem('usergroups') || '[]') as string[]).map(g => (
            <Select.Option key={g} value={g}>
              {g}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </Sider>
  );
};

export default Sidebar;
