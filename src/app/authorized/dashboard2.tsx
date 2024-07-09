"use client";

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

export function Dashboard2() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 600,
        height: 300,
        layout: {
          background: { type: ColorType.Solid, color: 'white' },
          textColor: 'black',
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',    // Green color for increasing prices
        downColor: '#ef5350',  // Red color for decreasing prices
        borderVisible: false,
        wickUpColor: '#26a69a',    // Green color for the wick on up candles
        wickDownColor: '#ef5350',  // Red color for the wick on down candles
      });

      const data = [
        { time: '2023-05-01', open: 150.00, high: 155.00, low: 149.00, close: 153.50 },
        { time: '2023-05-02', open: 153.50, high: 157.00, low: 152.00, close: 156.00 },
        { time: '2023-05-03', open: 156.00, high: 158.50, low: 154.50, close: 157.50 },
        { time: '2023-05-04', open: 157.50, high: 160.00, low: 146.00, close: 149.00 },
        { time: '2023-05-05', open: 159.00, high: 162.00, low: 158.00, close: 161.50 },
        // Add more data points as needed
      ];

      candlestickSeries.setData(data);

      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <h1 className="text-2xl font-bold">Dashboard 2</h1>
        <div className="p-4">
          <div ref={chartContainerRef} />
        </div>
      </div>
    </div>
  );
}