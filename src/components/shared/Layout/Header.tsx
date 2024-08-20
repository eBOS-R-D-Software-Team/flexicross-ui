import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC = () => {
   const location = useLocation();

   // Define the pages where the new dropdown should appear
   const pagesWithIndicatorsDropdown = ['/indicators/conservation']; // Adjust these paths as needed

   return (
      <Header style={{ padding: 0, background: 'white', height:60, display: 'flex' }}>        
      </Header>
   )
};

export default AppHeader;
