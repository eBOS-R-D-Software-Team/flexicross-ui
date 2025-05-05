/* ------------------------------------------------------------------ */
/*  VisualAnalyticsDashboard.tsx                                      */
/* ------------------------------------------------------------------ */

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Layout,
  Row,
  Col,
  Card,
  Select,
  Spin,
} from 'antd';

import {
  processAnomalyData,
  processDataDetection,
  totalDataTypesPerDay,
  mergeAndPrepareData,
  getAnomalyLineColor,
  getDetectionLineColor,
} from '../../hooks/useRiskTypeCount';

import { Line } from '@ant-design/plots';
import PieChartWithPopup from '../../components/charts/PieChart';
import BarChartWithPopup from '../../components/charts/BarChart';
import MapComponent from '../../components/shared/Map/MapComponent';

/* ------------------------------------------------------------------ */
/*  visual dashboard wrapper                                          */
/* ------------------------------------------------------------------ */

interface DashboardPayload {
  id: string;
  datetime: string;
  data: any[];
  filters: Record<string, any>;
}

const VisualAnalyticsDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dash = useSelector((s: RootState) =>
    s.visualDashboardData.dashboards.find(d => d.id === id),
  ) as DashboardPayload | undefined;

  if (!dash) return <Navigate to="/visual/view-dashboards" replace />;

  const anomalyData   = dash.data.filter(x => x.anomalyType);
  const detectionData = dash.data.filter(x => x.detectionType);

  return (
    <Layout style={{ padding: 24 }}>
      <AnalyticsCharts
        anomalyData={anomalyData}
        detectionData={detectionData}
      />
    </Layout>
  );
};

export default VisualAnalyticsDashboard;

/* ------------------------------------------------------------------ */
/*  AnalyticsCharts (chart-only)                                      */
/* ------------------------------------------------------------------ */

interface ChartsProps {
  anomalyData: any[];
  detectionData: any[];
}

const AnalyticsCharts: React.FC<ChartsProps> = ({ anomalyData, detectionData }) => {
  /* ---------------- raw → tiny rows ---------------- */
  const [tinyAnomaly,    setTinyAnomaly]    = useState<any[]>([]);
  const [tinyDetection,  setTinyDetection]  = useState<any[]>([]);

  /* ---------------- trend line arrays --------------- */
  const [trendAnomaly,   setTrendAnomaly]   = useState<any[]>([]);
  const [trendDetection, setTrendDetection] = useState<any[]>([]);

  /* ---------------- filtered selections ------------- */
  const [selAnomTypes, setSelAnomTypes] = useState<string[]>([]);
  const [selDetTypes,  setSelDetTypes]  = useState<string[]>([]);

  /* ---------------- data fed to plots --------------- */
  const [plotAnomaly, setPlotAnomaly] = useState<any[]>([]);
  const [plotDetect,  setPlotDetect]  = useState<any[]>([]);
  const [combinedAB,  setCombinedAB]  = useState<any[]>([]);

  /* ---------------- distributions ------------------- */
  const [anomDist, setAnomDist] = useState<any[]>([]);
  const [detDist,  setDetDist]  = useState<any[]>([]);

  /* ---------------- map data ------------------------ */
  const [anomLocations, setAnomLocations] = useState<any[]>([]);
  const [detLocations,  setDetLocations]  = useState<any[]>([]);

  /* ------------------------------------------------------------------
     1. preprocess snapshot rows once
  ------------------------------------------------------------------ */
  useEffect(() => {
    const pA = processAnomalyData(anomalyData);
    const pD = processDataDetection(detectionData);

    setTinyAnomaly(pA);
    setTinyDetection(pD);

    setAnomDist(pA);
    setDetDist(pD);

    /* default selections = first 2 types */
    setSelAnomTypes(Array.from(new Set(pA.map(r => r.type))).slice(0, 2));
    setSelDetTypes (Array.from(new Set(pD.map(r => r.type))).slice(0, 2));

    /* locations for maps */
    setAnomLocations(
      anomalyData
        .filter(x => x.trackingDetection || x.location)
        .map(x =>
          x.trackingDetection ? x.trackingDetection.geometries[0] : x.location,
        ),
    );
    setDetLocations(
      detectionData
        .filter(x => x.trackingDetection || x.location)
        .map(x =>
          x.trackingDetection ? x.trackingDetection.geometries[0] : x.location,
        ),
    );

    /* combined line (count per day) */
    const totA = totalDataTypesPerDay(anomalyData);
    const totD = totalDataTypesPerDay(detectionData);
    setCombinedAB(mergeAndPrepareData(totA, totD));
  }, [anomalyData, detectionData]);

  /* ------------------------------------------------------------------
     2. calc trendlines when plot rows change
  ------------------------------------------------------------------ */
  useEffect(() => {
    setTrendAnomaly(calculateTrendline(tinyAnomaly));
  }, [tinyAnomaly]);

  useEffect(() => {
    setTrendDetection(calculateTrendline(tinyDetection));
  }, [tinyDetection]);

  /* ------------------------------------------------------------------
     3. filter rows + merge trendlines
  ------------------------------------------------------------------ */
  useEffect(() => {
    const filtered = tinyAnomaly.filter(r => selAnomTypes.includes(r.type));
    setPlotAnomaly([...filtered, ...trendAnomaly]);
  }, [tinyAnomaly, selAnomTypes, trendAnomaly]);

  useEffect(() => {
    const filtered = tinyDetection.filter(r => selDetTypes.includes(r.type));
    setPlotDetect([...filtered, ...trendDetection]);
  }, [tinyDetection, selDetTypes, trendDetection]);

  /* ---------------- Select options ------------------ */
  const anomOptions = Array.from(new Set(tinyAnomaly.map(r => r.type))).map(t => ({
    label: t, value: t,
  }));
  const detOptions  = Array.from(new Set(tinyDetection.map(r => r.type))).map(t => ({
    label: t, value: t,
  }));

  /* ---------------- Plot configs -------------------- */
  const anomLineCfg = useMemo(() => ({
    xField: 'time',
    yField: 'total',
    colorField: 'type',
    style: {
      lineWidth: 2,
      lineDash: (items: { type: string }[]) =>
        items[0].type.includes('(Trend)') ? [2, 4] : [0, 0],
      stroke: (items: { type: string }[]) =>
        getAnomalyLineColor(items[0].type),
    },
  }), []);

  const detLineCfg = useMemo(() => ({
    xField: 'time',
    yField: 'total',
    colorField: 'type',
    style: {
      lineWidth: 2,
      lineDash: (items: { type: string }[]) =>
        items[0].type.includes('(Trend)') ? [2, 4] : [0, 0],
      stroke: (items: { type: string }[]) =>
        getDetectionLineColor(items[0].type),
    },
  }), []);

  const combinedCfg = useMemo(
    () => ({
      xField: 'date',
      yField: 'value',
      colorField: 'type',
  
      /* NEW — make it look like the original report */
      sizeField: 'value',          // so big counts get thicker lines
      shapeField: 'line',          // draw points at the same time
      style: {
        lineWidth: 3,              // thicker stroke
        lineCap: 'round',
        lineJoin: 'round',
        /* keep the same colours as before */
        stroke: (items: { type: string }[]) =>
          items[0].type === 'anomalyCount' ? '#002353' : '#32c7c1',
      },
  
      axis: {
        x: { title: 'date' },
        y: { title: 'anomaly/detection value', min: 0 },
      },
  
      legend: { layout: 'horizontal', position: 'top' },
    }),
    [],
  );
  

  /* ------------------------------------------------------------------ */
  /*                               RENDER                               */
  /* ------------------------------------------------------------------ */
  return (
    <>
      {/* ────────────── Anomalies Trend ────────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col span={24}>
          <Card title="Anomalies Trend">
            <Select
              mode="multiple"
              allowClear
              style={{ width: 400, marginBottom: 16 }}
              value={selAnomTypes}
              onChange={setSelAnomTypes}
              options={anomOptions}
            />
            {!plotAnomaly.length ? (
              <Spin />
            ) : (
              <Line data={plotAnomaly} autoFit {...anomLineCfg} />
            )}
          </Card>
        </Col>
      </Row>

      {/* ────────────── Detections Trend ───────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col span={24}>
          <Card title="Detections Trend">
            <Select
              mode="multiple"
              allowClear
              style={{ width: 400, marginBottom: 16 }}
              value={selDetTypes}
              onChange={setSelDetTypes}
              options={detOptions}
            />
            {!plotDetect.length ? (
              <Spin />
            ) : (
              <Line data={plotDetect} autoFit {...detLineCfg} />
            )}
          </Card>
        </Col>
      </Row>

      {/* ──────────── Combined Count Line ──────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col span={24}>
          <Card title="Anomalies & Detections Count">
            {!combinedAB.length ? (
              <Spin />
            ) : (
              <Line data={combinedAB} autoFit {...combinedCfg} />
            )}
          </Card>
        </Col>
      </Row>

      {/* ───────────────── Pie Distributions ──────────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} lg={12}>
          <Card title="Anomalies Distribution">
            <PieChartWithPopup data={anomDist} type="anomalyType" />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Detections Distribution">
            <PieChartWithPopup data={detDist} type="detectionType" />
          </Card>
        </Col>
      </Row>

      {/* ─────────────── Involved Objects Bar ─────────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} lg={12}>
          <Card title="Anomalies – Involved Objects">
            <BarChartWithPopup anomaliesData={anomalyData} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Detections – Involved Objects">
            <BarChartWithPopup anomaliesData={detectionData} />
          </Card>
        </Col>
      </Row>

      {/* ─────────────────── Maps ──────────────────── */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} lg={12}>
          <Card title="Anomalies Locations">
            {anomLocations.length ? (
              <MapComponent
                locations={anomLocations}
                center={anomLocations[0].geometry?.coordinates?.[0] ?? [0, 0]}
              />
            ) : (
              <Spin />
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Detections Locations">
            {detLocations.length ? (
              <MapComponent
                locations={detLocations}
                center={detLocations[0].geometry?.coordinates?.[0] ?? [0, 0]}
              />
            ) : (
              <Spin />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Helper: trendline calculation (unchanged from AnalyticsDashboard) */
/* ------------------------------------------------------------------ */

function calculateTrendline(data: any[]) {
  // group by type
  const grouped: Record<string, [number, number][]> = {};
  data.forEach(row => {
    if (!grouped[row.type]) grouped[row.type] = [];
    const [day, month, year] = row.time.split('-').map(Number);
    const time  = new Date(year, month - 1, day).getTime();
    const total = Number(row.total);
    if (!isNaN(time) && !isNaN(total)) grouped[row.type].push([time, total]);
  });

  const trendRows: any[] = [];
  Object.keys(grouped).forEach(type => {
    const pts = grouped[type];
    if (pts.length < 2) return;

    const xs = pts.map(p => p[0]);
    const ys = pts.map(p => p[1]);
    const n  = pts.length;
    const sumX  = xs.reduce((a, b) => a + b, 0);
    const sumY  = ys.reduce((a, b) => a + b, 0);
    const sumXY = pts.reduce((a, p) => a + p[0] * p[1], 0);
    const sumX2 = xs.reduce((a, b) => a + b * b, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    const startY = Math.max(0, m * minX + b);
    const endY   = Math.max(0, m * maxX + b);

    trendRows.push({
      time: formatDate(new Date(minX)),
      total: startY,
      type: `${type} (Trend)`,
    });
    trendRows.push({
      time: formatDate(new Date(maxX)),
      total: endY,
      type: `${type} (Trend)`,
    });
  });

  return trendRows;
}

function formatDate(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
