import React, { ReactNode } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface AppContentProps {
    children: ReactNode;
}


const AppContent: React.FC<AppContentProps> = ({ children }) => (
    <Content style={{ margin: '24px 16px 0' }}>
        <div
            style={{
                padding: 24,
                minHeight: 360,
                borderRadius: 16,
            }}
        >       
            {children}
        </div>
    </Content>
);

export default AppContent;
