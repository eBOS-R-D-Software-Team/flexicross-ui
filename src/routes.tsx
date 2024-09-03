import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import MainLayout from './components/layouts/MainLayout';
import DataTableComponent from './components/shared/Datatable/DataTableComponent';
import Dashboards from './components/pages/Dashboards';
import SingleDashboard from './components/pages/SingleDashboard';
import AnalyticsDashboard from './components/pages/AnalyticsDashboard';
import { dummyData } from './dummyData';
import { anomalyDummy } from './components/pages/anomalydummy';

const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<MainLayout menu="1"><Home /></MainLayout>} />
        <Route path="/risk/create-dashboard" element={<MainLayout menu={"2"}><DataTableComponent data={dummyData} flag={'risk'} fullscreen={false}/></MainLayout>} />
        <Route path="/anomaly" element={<MainLayout menu={"3"}><DataTableComponent data={anomalyDummy} flag={'anomaly'} fullscreen={false}/></MainLayout>} />

        <Route path="risk/view-dashboards" element={<MainLayout menu={"4"}><Dashboards /></MainLayout>} />
        <Route path="risk/dashboard/:id" element={<MainLayout menu={"5"}><SingleDashboard /></MainLayout>} />
        <Route path="/visual-analytics/report" element={<MainLayout menu={"6"}><AnalyticsDashboard /></MainLayout>} />

    </Routes>
);

export default AppRoutes;
