// Dashboard1.tsx
"use client";

/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import StockChart from "./stockchart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { StockInfo } from "./stockinfo";
import { TimeIntervalSelector } from "./timeintervalselector";


interface Dashboard1Props {
  ticker: string;
  initialPeriod: string;
}

interface HistoricalDataPoint {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: string;
}

interface StockData {
  historicalData: HistoricalDataPoint[];
}

export function Dashboard1({ ticker, initialPeriod }: Dashboard1Props) {
  const [timeInterval, setTimeInterval] = React.useState('1d');
  const [stockData, setStockData] = React.useState<StockData | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jesi.no/${ticker}/history/${timeInterval}`,
          {
            headers: {
              'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
            }
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const data = await response.json() as StockData;
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStockData(null);
      }
    };

    void fetchData();
  }, [ticker, timeInterval]);

  const handleTimeIntervalChange = (newInterval: string) => {
    setTimeInterval(newInterval);
  };

  const cardStyle = { backgroundColor: 'transparent', border: 'none', borderRadius: 0 };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
        <div className="grid pl-16 px-2 py-2 gap-8 grid-cols-8 grid-rows-12 h-full">
          <Card className="grid col-span-6 row-span-6 no-radius" style={cardStyle}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{ticker} Stock</CardTitle>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <TimeIntervalSelector currentInterval={timeInterval} onIntervalChange={handleTimeIntervalChange} />
              </div>
            </CardHeader>
            <CardContent>
              {stockData && <StockChart data={stockData.historicalData} timeInterval={timeInterval} />}
            </CardContent>
          </Card>
          <Card className="grid col-span-2 row-span-12 no-radius" style={cardStyle}>
            General Info
            Hello
            <StockInfo ticker={ticker} />
          </Card>
          <Card className="grid col-span-2 row-span-6 no-radius" style={cardStyle}>3</Card>
          <Card className="grid col-span-4 row-span-6 no-radius" style={cardStyle}>
            <Tabs defaultValue="incomestatement" className="w-full h-full">
              <TabsList>
                <TabsTrigger value="incomestatement">Income Statement</TabsTrigger>
                <TabsTrigger value="balancesheet">Balance Sheet</TabsTrigger>
                <TabsTrigger value="cashflowstatement">Cash Flow Statement</TabsTrigger>
                <TabsTrigger value="owners">Owners</TabsTrigger>
              </TabsList>
              <TabsContent value="incomestatement">
              </TabsContent>
              <TabsContent value="balancesheet">3
              </TabsContent>
              <TabsContent value="cashflowstatement">2
              </TabsContent>
              <TabsContent value="owners">1
              </TabsContent>
            </Tabs>
          </Card>
        </div> 
      </div>
    </div>
  );
}