import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import MainLayout from './components/layouts/MainLayout';
import DataTableComponent from './components/shared/Datatable/DataTableComponent';
import Dashboards from './components/pages/Dashboards';
import SingleDashboard from './components/pages/SingleDashboard';
import AnalyticsDashboard from './components/pages/AnalyticsDashboard';
import { dummyData } from './dummyData';
import DetailPage from './components/shared/Details/DetailsPage';
import { anomalyDummy } from './redux/slices/data/anomalydummy';
import CreateVisualDashboard from './components/pages/CreateVisualDashboard'; // NEW
import ViewVisualDashboards from './components/pages/ViewVisualDashboards';   // NEW
import VisualAnalyticsDashboard from './components/pages/VisualAnalyticsDashboard'; // NEW


const AppRoutes: React.FC = () => (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <MainLayout menu="1">
            <Home />
          </MainLayout>
        }
      />
  
      {/* ──────────────────────────────  RISK  ────────────────────────────── */}
      <Route
        path="/risk/create-dashboard"
        element={
          <MainLayout menu="2">
            <DataTableComponent data={dummyData} flag="risk" fullscreen={false} />
          </MainLayout>
        }
      />
  
      <Route
        path="/risk/view-dashboards"
        element={
          <MainLayout menu="4">
            <Dashboards />
          </MainLayout>
        }
      />
  
      <Route
        path="/risk/dashboard/:id"
        element={
          <MainLayout menu="5">
            <SingleDashboard />
          </MainLayout>
        }
      />
  
      {/* ─────────────────────────────  ANOMALY (stand-alone example) ───────────────────────────── */}
      <Route
        path="/anomaly"
        element={
          <MainLayout menu="3">
            <DataTableComponent
              data={anomalyDummy}
              flag="anomaly"
              fullscreen={false}
            />
          </MainLayout>
        }
      />
  
      {/* ───────────────────────  VISUAL-ANALYTICS  (NEW SECTION) ─────────────────────── */}
      <Route
        path="/visual/create-dashboard"
        element={
          <MainLayout menu="6a">
            <CreateVisualDashboard />
          </MainLayout>
        }
      />
  
      <Route
        path="/visual/view-dashboards"
        element={
          <MainLayout menu="6b">
            <ViewVisualDashboards />
          </MainLayout>
        }
      />
  
      <Route
        path="/visual/dashboard/:id"
        element={
          <MainLayout menu="6c">
            <VisualAnalyticsDashboard />
          </MainLayout>
        }
      />
  
      {/* ──────────────────────────  MISC / LEGACY  ───────────────────────── */}
      <Route
        path="/visual-analytics/report"
        element={
          <MainLayout menu="7">
            <AnalyticsDashboard />
          </MainLayout>
        }
      />
  
      <Route
        path="/involved-objects/:type/:id"
        element={
          <MainLayout menu="8">
            <DetailPage />
          </MainLayout>
        }
      />
    </Routes>
  );
  

export default AppRoutes;
