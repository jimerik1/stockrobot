// LargeStockpriceChartCard.tsx
/* eslint-disable */

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../../../../components/ui/card";
import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../components/ui/chart";
import { TimeIntervalSelector } from '../timeintervalselector';

interface StockDataPoint {
  id: number;
  ticker: string;
  priceOpen: number;
  priceHigh: number;
  priceLow: number;
  priceClose: number;
  unit: string;
  date: Date;
  Volume: number; // Note the capital 'V' to match your data structure
}

interface LargeStockpriceChartCardProps {
  data: StockDataPoint[] | undefined;
  isLoading: boolean;
  error: Error | null; // Change this to a more generic Error type
  timeInterval: string;
  onTimeIntervalChange: (interval: string) => void;
}


const chartConfig = {
  views: {
    label: "Stock Price",
  },
  priceOpen: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
  priceClose: {
    label: "Close",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const LargeStockpriceChartCard: React.FC<LargeStockpriceChartCardProps> = ({ 
  data, 
  isLoading, 
  error, 
  timeInterval, 
  onTimeIntervalChange 
}) => {
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("priceClose");

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map(item => ({
      ...item,
      date: new Date(item.date).toISOString(),
    }));
  }, [data]);

  const total = useMemo(() => ({
    priceOpen: chartData.reduce((acc, curr) => acc + curr.priceOpen, 0),
    priceClose: chartData.reduce((acc, curr) => acc + curr.priceClose, 0),
  }), [chartData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className="col-span-6 row-span-2 flex flex-col">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Stock Price Chart</CardTitle>
          <CardDescription>
            Showing stock prices for the selected time interval
          </CardDescription>
        </div>
        <TimeIntervalSelector currentInterval={timeInterval} onIntervalChange={onTimeIntervalChange} />
        <div className="flex">
          {["priceOpen", "priceClose"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  ${total[key as keyof typeof total].toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 flex-grow overflow-auto">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};