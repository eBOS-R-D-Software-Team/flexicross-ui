import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import MainLayout from './components/layouts/MainLayout';
import DataTableComponent from './components/shared/Datatable/DataTableComponent';
import Dashboard from './components/pages/Dashboard';

const AppRoutes: React.FC = () => (
    <Routes>
        {/* <Route path="/" element={<MainLayout menu="1"><Home /></MainLayout>} /> */}
        <Route path="/" element={<MainLayout menu={"4"}><DataTableComponent /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout menu={"3"}><Dashboard /></MainLayout>} />

    </Routes>
);

export default AppRoutes;
