// Dashboard2.tsx
"use client";

import React from 'react';
import { api } from '~/trpc/react';
import { LargeStockpriceChartCard } from './chartcards/largestockpricechartcard';
import { SmallChartCard1 } from './chartcards/smallchartcard1';
import { RightHandColumn } from './chartcards/righthandcolumn';
import { LargeBottomLeft } from './chartcards/largebottomleft';
import { LargeBottomRight } from './chartcards/largebottomright';
import { SmallChartCard2 } from './chartcards/smallchartcard2';

interface Dashboard2Props {
  ticker: string;
  initialPeriod: string;
}

export function Dashboard2({ ticker, initialPeriod }: Dashboard2Props) {
  const [timeInterval, setTimeInterval] = React.useState(initialPeriod);

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
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full bg-muted/40">
        <div className="grid pl-16 grid-cols-8 grid-rows-6 gap-1 h-full">
          <LargeStockpriceChartCard 
            data={stockData} 
            isLoading={isLoading} 
            error={error as Error | null} // Cast the error to Error | null
            timeInterval={timeInterval}
            onTimeIntervalChange={handleTimeIntervalChange}
          />
          <SmallChartCard1 />
          <RightHandColumn />
          <LargeBottomLeft />
          <LargeBottomRight />
          <SmallChartCard2 />
        </div>
      </div>
    </div>
  );
}
