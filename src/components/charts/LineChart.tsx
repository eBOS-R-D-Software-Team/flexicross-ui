import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data (original + trendline)
const data = [
  { time: '01-01-2023', Contraband: 10, Weapons: 5 },
  { time: '02-01-2023', Contraband: 20, Weapons: 10 },
  { time: '03-01-2023', Contraband: 30, Weapons: 15 },
  { time: '01-01-2023', 'Contraband (Trend)': 10, 'Weapons (Trend)': 5 },
  { time: '03-01-2023', 'Contraband (Trend)': 30, 'Weapons (Trend)': 15 },
];

const ChartComponent = () => {
  return (
    <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />

      {/* Original Data */}
      <Line type="monotone" dataKey="Contraband" name="Contraband" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Weapons" name="Weapons" stroke="#82ca9d" activeDot={{ r: 8 }} />

      {/* Trendlines */}
      <Line type="linear" dataKey="Contraband (Trend)" name="Contraband (Trend)" stroke="#ff7300" strokeDasharray="5 5" />
      <Line type="linear" dataKey="Weapons (Trend)" name="Weapons (Trend)" stroke="#ff00ff" strokeDasharray="5 5" />
    </LineChart>
  );
};

export default ChartComponent;