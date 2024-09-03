import React, { ReactNode, useEffect } from 'react';
import { Card, Layout, Typography } from 'antd';
import { dataItem } from '../../../interfaces/riskData';
import { Tiny } from '@ant-design/charts';
import { Color } from 'antd/es/color-picker';

const { Header } = Layout;
interface AppContentProps {
    data: any;
    title:any;
    total:any;
}

const StatsGraph: React.FC<AppContentProps> = ({ data,title,total })=> {
    useEffect(() => {
        // dispatch(getDashboardDataById(id));
        console.log(data,title,total,data/total,Math.round((data/total) * 10) / 10 );            
    }, [data,title,total]);
    const percent = Math.round((data/total) * 10) / 10;
    const config = {
        percent,
      width: 140,
      height: 140,
      theme: "classicDark",

      color: ['#ffffff', '#66AFF4'],
      annotations: [
        {
          type: 'text',
          style: {
            text: `${Math.round(percent * 100)}%`,
            x: '50%',
            y: '50%',
            textAlign: 'center',
            fill: '#ffffff',
            fontSize: 32,
            fontStyle: 'bold',
          },
        },
      ],
    };
   return (
    <Card style={{margin: '0 auto',textAlign:'center'}}>
        <Typography.Title level={5}>{title}</Typography.Title>
<Tiny.Ring {...config} /></Card>
   )
};

export default StatsGraph;
