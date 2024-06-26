"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

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

export function StockInfo({ ticker }: StockInfoProps) {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://ec2-16-170-98-89.eu-north-1.compute.amazonaws.com:8080/${ticker}`);
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
  );
}