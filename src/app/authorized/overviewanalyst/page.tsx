"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { StockPriceChart, ChartType } from "./charts/stockpricechart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Toggle } from '~/components/ui/toggle';

type TimeRange = '1d' | '3d' | '1w' | '1m' | '1y' | '5y';
type Ticker = string;

export default function OverviewAnalyst() {
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [timeRange, setTimeRange] = useState<TimeRange>('1m');
  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);

  const handleChartTypeChange = (value: string) => {
    setChartType(value as ChartType);
  };

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  const handleToggleChange = (pressed: boolean) => {
    setIsMagnifierEnabled(pressed);
  };

  return (
    <div>
      <div className="flex h-screen w-full overflow-hidden">
        <div className="flex flex-col w-full bg-muted/40">
          <div className="grid pl-16 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 grid-rows-8 h-full">
          <Card className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-2 row-span-6 xl:row-span-3 flex flex-col">
            <CardHeader className="flex flex-col bg-slate-100">
                <div className="flex justify-between items-center">
                  <CardTitle>Stock Chart</CardTitle>
                  <div className="flex space-x-2">
                    {(['1d', '3d', '1w', '1m', '1y', '5y'] as TimeRange[]).map((range) => (
                      <Button className="border-y-slate-400"
                        key={range}
                        variant={timeRange === range ? "default" : "outline"}
                        onClick={() => handleTimeRangeChange(range)}
                      >
                        {range}
                      </Button>
                    ))}

                  </div>  
                  <Select onValueChange={handleChartTypeChange} defaultValue={chartType}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candlestick">Candlestick</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="baseline">Baseline</SelectItem>
                    <SelectItem value="histogram">Histogram</SelectItem>
                  </SelectContent>
                </Select>


                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
              <div className="w-full h-full">
              <StockPriceChart 
                chartType={chartType} 
                timeRange={timeRange} 
              />
            </div>

              </CardContent>
            </Card>


            <Card className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-3 flex flex-col">
                  <CardHeader className="bg-slate-100">
                <CardTitle>2</CardTitle>
                  </CardHeader>
                <CardContent className="flex-grow overflow-auto">

                </CardContent>
            </Card>
          
            <Card className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-3 flex flex-col">
                  <CardHeader>
                <CardTitle>3</CardTitle>
                  </CardHeader>
                <CardContent className="flex-grow overflow-auto">
                  3
                </CardContent>
            </Card>

            </div>      
          </div>
        </div>
      </div>

    );
  };