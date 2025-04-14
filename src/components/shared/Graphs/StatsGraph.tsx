import React, { useEffect } from 'react';
import { Card, Typography } from 'antd';
import { Tiny } from '@ant-design/charts';

interface AppContentProps {
  data: any;
  title: any;
  total: any;
}

const StatsGraph: React.FC<AppContentProps> = ({ data, title, total }) => {
  useEffect(() => {
    console.log(data, title, total, data / total, Math.round((data / total) * 10) / 10);
  }, [data, title, total]);
  
  const percent = Math.round((data / total) * 10) / 10;
  
  const config = {
    percent,
    width: 140,
    height: 140,
    // Removed dark theme for light mode
    // theme: "classicDark",
    // For Tiny.Ring, the first color is the empty (background) color and the second is the progress color.
    color: ['#f0f2f5', '#002353'],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${Math.round(percent * 100)}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fill: '#002353', // Use primary dark blue for text
          fontSize: 32,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return (
    <Card style={{ margin: '0 auto', textAlign: 'center' }}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Tiny.Ring {...config} />
    </Card>
  );
};

export default StatsGraph;
