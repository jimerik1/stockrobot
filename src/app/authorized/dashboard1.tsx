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
import { StockInfo } from "./stockinfo";
import { PeriodSelector } from "./periodselector";

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
  const [period, setPeriod] = React.useState(initialPeriod);
  const [stockData, setStockData] = React.useState<StockData | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log("API Key:", process.env.NEXT_PUBLIC_API_KEY);
      try {
        const response = await fetch(
          `https://ec2-16-170-98-89.eu-north-1.compute.amazonaws.com/${ticker}/history/${period}`,
  
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
  }, [ticker, period]);

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
        <div className="grid pl-16 px-2 py-2 gap-8 grid-cols-8 grid-rows-12 h-full">
          <Card className="grid col-span-5 row-span-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{ticker} Stock</CardTitle>
              <PeriodSelector currentPeriod={period} onPeriodChange={handlePeriodChange} />
            </CardHeader>
            <CardContent>
              {stockData && <StockChart data={stockData.historicalData} title={`${ticker} Stock Prices`} />}
            </CardContent>
          </Card>
          <Card className="grid col-span-3 row-span-12">
            <StockInfo ticker={ticker} />
          </Card>
          <Card className="grid col-span-2 row-span-6">3</Card>
          <Card className="grid col-span-3 row-span-6">4</Card>
        </div>
      </div>
    </div>
  );
}