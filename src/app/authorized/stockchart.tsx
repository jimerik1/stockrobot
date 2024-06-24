// StockChart.tsx
"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StockData {
  date: Date;
  priceClose: number;
}

interface StockChartProps {
  data: StockData[];
}

export default function StockChart({ data }: StockChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="priceClose" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}