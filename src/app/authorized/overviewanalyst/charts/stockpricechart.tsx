/* eslint-disable */
"use client"

import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, CrosshairMode, Coordinate, LineData, BarData, CandlestickSeriesPartialOptions, LineSeriesPartialOptions, BarSeriesPartialOptions, AreaSeriesPartialOptions, BaselineSeriesPartialOptions, HistogramSeriesPartialOptions } from 'lightweight-charts';
import { api } from '~/trpc/react';

export type ChartType = 'candlestick' | 'line' | 'bar' | 'area' | 'baseline' | 'histogram';
export type TimeRange = '1d' | '3d' | '1w' | '1m' | '1y' | '5y';

interface StockPriceChartProps {
  chartType: ChartType;
  timeRange: TimeRange;
}

export const StockPriceChart: React.FC<StockPriceChartProps> = ({ chartType, timeRange }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const toolTipRef = useRef<HTMLDivElement | null>(null);

  const { data: historicalData, isLoading, error } = api.fmpdata.getHistoricalData.useQuery({
    ticker: 'TSLA',
    timeRange: timeRange,
  });

  useEffect(() => {
    if (chartContainerRef.current && historicalData) {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
  
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
                layout: {
          background: { color: 'white' },
          textColor: 'black',
        },
        leftPriceScale: {
          visible: true,
          borderVisible: false,
        },
        rightPriceScale: {
          visible: false,
        },
        timeScale: {
          borderVisible: false,
        },
        crosshair: {
          horzLine: {
            visible: false,
            labelVisible: false,
          },
          vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: false,
          },
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
      });
      chartRef.current = chart;

      let series;
      switch (chartType) {
        case 'candlestick':
          series = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          } as CandlestickSeriesPartialOptions);
          break;
        case 'line':
          series = chart.addLineSeries({ color: '#fd392a' } as LineSeriesPartialOptions);
          break;
        case 'bar':
          series = chart.addBarSeries({ upColor: '#26a69a', downColor: '#ef5350' } as BarSeriesPartialOptions);
          break;
        case 'area':
          series = chart.addAreaSeries({
            topColor: 'rgba(239, 83, 80, 0.05)',
            bottomColor: 'rgba(239, 83, 80, 0.28)',
            lineColor: 'rgba(239, 83, 80, 1)',
            lineWidth: 2,
          } as AreaSeriesPartialOptions);
          break;
        case 'baseline':
          series = chart.addBaselineSeries({
            baseValue: { type: 'price', price: 25 },
            topLineColor: 'rgba(38, 166, 154, 1)',
            topFillColor1: 'rgba(38, 166, 154, 0.28)',
            topFillColor2: 'rgba(38, 166, 154, 0.05)',
            bottomLineColor: 'rgba(239, 83, 80, 1)',
            bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
            bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
          } as BaselineSeriesPartialOptions);
          break;
        case 'histogram':
          series = chart.addHistogramSeries({ color: '#26a69a' } as HistogramSeriesPartialOptions);
          break;
        default:
          throw new Error(`Unsupported chart type: ${chartType}`);
      }

      series.applyOptions({
        priceFormat: {
          type: 'price',
          precision: 2,
          minMove: 0.01,
        },
      });
      
        
      let formattedData;
      if (timeRange === '1d') {
        formattedData = historicalData.map((item: any) => ({
          time: new Date(item.date).getTime() / 1000,
          value: parseFloat(item.close),
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          close: parseFloat(item.close),
        }));
      } else {
        formattedData = historicalData.historical.map((item: any) => ({
          time: new Date(item.date).getTime() / 1000,
          value: parseFloat(item.close),
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          close: parseFloat(item.close),
        }));
      }
  
      formattedData.sort((a: { time: number }, b: { time: number }) => a.time - b.time);
  
      if (chartType === 'line' || chartType === 'area' || chartType === 'baseline' || chartType === 'histogram') {
        formattedData = formattedData.map((item: any) => ({
          time: item.time,
          value: item.close,
        }));
      }
  
      series.setData(formattedData);
      chart.timeScale().fitContent();
  
      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.resize(
            chartContainerRef.current.clientWidth,
            chartContainerRef.current.clientHeight
            );
        }
                };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    }
  }, [historicalData, chartType, timeRange]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div 
      key={timeRange} 
      ref={chartContainerRef} 
      style={{ width: '100%', height: '100%', position: 'relative' }} 
    />
  );};