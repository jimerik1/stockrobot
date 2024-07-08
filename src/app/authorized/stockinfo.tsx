// StockInfo.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { api } from '~/trpc/react';

interface StockInfoProps {
  ticker: string;
}

interface StockData {
  currentPrice: number;
  dayHigh: number;
  dayLow: number;
  fiftyDayAverage: number;
  symbol: string;
  volume: number;
}

interface StatusData {
  Status: string;
}

export function StockInfo({ ticker }: StockInfoProps) {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusdata, setStatusData] = useState<StatusData | null>(null);
  const [statusisLoading, setStatusIsLoading] = useState(true);
  const [statuserror, setStatusError] = useState<string | null>(null);



  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://jesi.no/${ticker}/info`, {
          headers: {
            'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const data = await response.json() as StockData;
        setStockData(data);
      } catch (err) {
        setError('Error fetching stock data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchStockData();
  }, [ticker]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stockData) return <div>No data available</div>;

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle>{stockData.symbol} Stock Info</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Current Price: ${stockData.currentPrice.toFixed(2)}</p>
        <p>Day High: ${stockData.dayHigh.toFixed(2)}</p>
        <p>Day Low: ${stockData.dayLow.toFixed(2)}</p>
        <p>50 Day Average: ${stockData.fiftyDayAverage.toFixed(2)}</p>
        <p>Volume: {stockData.volume.toLocaleString()}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>{stockData.symbol} Stock Info TRPC</CardTitle>
      </CardHeader>
      <CardContent>hello 
      </CardContent>
    </Card>
    </div>
  );
}