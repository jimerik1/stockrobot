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
  timeInterval: string;
}

export default function StockChart({ data, timeInterval }: StockChartProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [cursorY, setCursorY] = useState<number | null>(null);

  const formattedData = data.map(item => {
    const date = new Date(item.date);
    return {
      ...item,
      date: !isNaN(date.getTime()) ? date : new Date(), // Handle invalid dates
    };
  });

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

  const formatXAxis = (tickItem: Date) => {
    switch (timeInterval) {
      case "1d":
        return tickItem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case "5d":
      case "1mo":
        return tickItem.toLocaleDateString();
      case "6mo":
      case "ytd":
      case "1y":
      case "5y":
      case "max":
        return tickItem.toLocaleDateString([], { month: 'short', year: 'numeric' }); // Show month and year
/*       case "5y":
      case "max":
        return tickItem.getFullYear().toString();
 */      default:
        return tickItem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // Determine tick count for the X-axis based on the time interval
  const getTickCount = () => {
    switch (timeInterval) {
      case "1d":
        return 24; // One tick per hour
      case "5d":
        return 5; // One tick per day
      case "1mo":
        return 30; // One tick per day
      case "6mo":
        return 6; // One tick per month
      case "ytd":
        return new Date().getMonth() + 1; // One tick per month up to current month
      case "1y":
        return 12; // One tick per month
      case "5y":
        return 5; // One tick per year
      case "max":
        return new Set(formattedData.map(d => d.date.getFullYear())).size; // One tick per unique year
      default:
        return 8; // Default tick count for other intervals
    }
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
            tickFormatter={formatXAxis} // Use the formatter function
            axisLine={false}
            tickLine={false}
            tickCount={getTickCount()} // Use dynamic tick count for X-axis
          />
          <YAxis 
            domain={yAxisDomain}
            tickFormatter={(value) => `$${value}`}
            axisLine={false}
            tickLine={false}
            tickCount={8} // Default tick count for Y-axis
          />
          <Tooltip 
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Close"]}
            labelFormatter={(label) => `Date: ${new Date(label).toLocaleString()}`}
          />
          <Area 
            type="linear" 
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