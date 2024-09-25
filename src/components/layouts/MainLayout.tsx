
import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Sidebar from '../shared/Layout/Sidebar';
import AppHeader from '../shared/Layout/Header';
import AppContent from '../shared/Layout/Content';
interface MainLayoutProps {
    children: ReactNode;
    menu: string; // Replace 'any' with the appropriate type for your menu prop
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar menu={props.menu}/>
            <Layout className="site-layout">
                <AppHeader />
                <AppContent>
                    {props.children}    </AppContent>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
