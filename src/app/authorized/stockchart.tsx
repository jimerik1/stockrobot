// StockChart.tsx
/* eslint-disable */
"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface HistoricalDataPoint {
  close: number;
  date: string;
}

interface StockChartProps {
  data: HistoricalDataPoint[];
}

export default function StockChart({ data }: StockChartProps) { // Prefix unused variable with underscore
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState<number | null>(null);

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

  return (
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
  );
}