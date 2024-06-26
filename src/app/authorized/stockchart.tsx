"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HistoricalDataPoint {
  close: number;
  date: string;
}

interface StockChartProps {
  data: HistoricalDataPoint[];
  title: string;
}

export default function StockChart({ data, title }: StockChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
  }));

  const minClose = Math.min(...formattedData.map(d => d.close));
  const maxClose = Math.max(...formattedData.map(d => d.close));
  
  // Round the min and max to the nearest $5
  const roundedMin = Math.floor(minClose / 5) * 5;
  const roundedMax = Math.ceil(maxClose / 5) * 5;
  
  const yAxisDomain = [roundedMin, roundedMax];

  return (
    <div>
      <h2>{title} Stock</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}