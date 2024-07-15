/* eslint-disable */
"use client";

import * as React from "react";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import StockChart from "./stockchart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { StockInfo } from "./stockinfo";
import { TimeIntervalSelector } from "./timeintervalselector";

interface Dashboard1Props {
  ticker: string;
  initialPeriod: string;
}

export function Dashboard1({ ticker, initialPeriod }: Dashboard1Props) {
  const [timeInterval, setTimeInterval] = React.useState(initialPeriod);

  // Use the tRPC hook
  const { data: stockData, isLoading, error } = api.stock.getStockData.useQuery(
    { 
      ticker,
      count: getCountForTimeInterval(timeInterval)
    },
    { enabled: !!ticker }
  );


  const handleTimeIntervalChange = (newInterval: string) => {
    setTimeInterval(newInterval);
  };

  const cardStyle = { backgroundColor: 'transparent', border: 'none', borderRadius: 0 };

  // Function to transform the data into the format expected by StockChart
  const transformDataForChart = (data: any[]) => {
    if (!data) return [];
    return data.map(item => ({
      close: item.priceClose,
      date: item.date,
    }));
  };

  // Helper function to determine the count based on timeInterval
  function getCountForTimeInterval(interval: string): number {
    switch (interval) {
      case "1d": return 24;
      case "5d": return 5 * 24;
      case "1mo": return 30 * 24;
      case "6mo": return 180 * 24;
      case "1y": return 365 * 24;
      case "5y": return 5 * 365 * 24;
      case "ytd": return Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)) * 24;
      case "max": return 10 * 365 * 24; // Assuming max is 10 years, adjust as needed
      default: return 24;
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
        <div className="grid pl-16 px-2 py-2 gap-8 grid-cols-8 grid-rows-12 h-full">
          <Card className="grid col-span-6 row-span-6 no-radius" style={cardStyle}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{ticker} Stock</CardTitle>
              <TimeIntervalSelector 
                currentInterval={timeInterval} 
                onIntervalChange={handleTimeIntervalChange} 
              />
            </CardHeader>
            <CardContent>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {(error as unknown as Error).message}</p>}
              {stockData && (
                <StockChart 
                  data={transformDataForChart(stockData)} 
                  timeInterval={timeInterval} 
                />
              )}
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