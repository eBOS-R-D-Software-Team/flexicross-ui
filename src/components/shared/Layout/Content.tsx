import React, { ReactNode } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
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
            <Breadcrumb style={{marginBottom:16}}
                items={[
                    {
                        href: 'dashboard',
                        title:  (
                            <><HomeOutlined /> <span>Home</span>  </>
                        ),
                    },
                    {
                        href: 'data-table',
                        title: (
                            <>
                                <UserOutlined />
                                <span>Risk Data Table</span>
                            </>
                        ),
                    }
                ]}
            />

            {children}
        </div>
    </Content>
);

export default AppContent;
