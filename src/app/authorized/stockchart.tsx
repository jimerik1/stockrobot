/* eslint-disable */
"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import styled from 'styled-components';

interface HistoricalDataPoint {
  close: number;
  date: string;
}

interface StockChartProps {
  data: HistoricalDataPoint[];
}

const IntervalButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#0052CC' : '#f7f7f7'};
  color: ${props => props.active ? 'white' : 'black'};
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  &:hover {
    background: ${props => props.active ? '#0052CC' : '#e7e7e7'};
  }
`;

export default function StockChart({ data }: StockChartProps) { // Prefix unused variable with underscore
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState<number | null>(null);
  const [timeInterval, setTimeInterval] = useState('1M');

  const timeIntervals = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'All'];

  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
  }));

  const minClose = Math.min(...formattedData.map(d => d.close));
  const maxClose = Math.max(...formattedData.map(d => d.close));
  
  const roundedMin = Math.floor(minClose / 5) * 5;
  const roundedMax = Math.ceil(maxClose / 5) * 5;
  
  const yAxisDomain = [roundedMin, roundedMax];

  const handleMouseMove = (e: React.MouseEvent) => {
    const chartHeight = e.currentTarget.clientHeight;
    const offsetY = e.nativeEvent.offsetY;
    const priceRange = roundedMax - roundedMin;
    const price = roundedMax - (offsetY / chartHeight) * priceRange;
    setCursorY(price);
  };

  const handleIntervalChange = (interval: string) => {
    setTimeInterval(interval);
    // Note: In a real implementation, you would typically fetch new data here
    // and update the parent component's state. For this example, we're just
    // updating the local state.
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        {timeIntervals.map(interval => (
          <IntervalButton
            key={interval}
            active={timeInterval === interval}
            onClick={() => handleIntervalChange(interval)}
          >
            {interval}
          </IntervalButton>
        ))}
      </div>
      <div onMouseMove={handleMouseMove} onMouseLeave={() => setCursorY(null)}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart 
            data={formattedData} 
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state?.activePayload?.[0]?.value !== undefined) {
                setHoveredValue(state.activePayload[0].value);
              }
            }}
            onMouseLeave={() => setHoveredValue(null)}
          >
            <defs>
              <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tickCount={8}
            />
            <YAxis 
              domain={yAxisDomain}
              tickFormatter={(value) => `$${value}`}
              axisLine={false}
              tickLine={false}
              tickCount={8}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Close"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke="#82ca9d" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorClose)" 
            />
            {hoveredValue !== null && (
              <ReferenceLine y={hoveredValue} stroke="#8884d8" strokeDasharray="3 3" />
            )}
            {cursorY !== null && (
              <ReferenceLine y={cursorY} stroke="#ff7300" strokeDasharray="3 3" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}