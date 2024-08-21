import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import MainLayout from './components/layouts/MainLayout';
import DataTableComponent from './components/shared/Datatable/DataTableComponent';
import Dashboards from './components/pages/Dashboards';
import SingleDashboard from './components/pages/SingleDashboard';

const AppRoutes: React.FC = () => (
    <Routes>
        {/* <Route path="/" element={<MainLayout menu="1"><Home /></MainLayout>} /> */}
        <Route path="/" element={<MainLayout menu={"4"}><DataTableComponent /></MainLayout>} />
        <Route path="/dashboards" element={<MainLayout menu={"3"}><Dashboards /></MainLayout>} />
        <Route path="/dashboard/:id" element={<MainLayout menu={"3"}><SingleDashboard /></MainLayout>} />

    </Routes>
);

export default AppRoutes;
