"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

interface StockInfoProps {
  ticker: string;
}

interface HistoricalDataPoint {
  close: number;
  date: string;
}

interface StockData {
  historicalData: HistoricalDataPoint[];
}

export function StockInfo({ ticker }: StockInfoProps) {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://ec2-16-170-98-89.eu-north-1.compute.amazonaws.com/${ticker}/history/5d`);
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
  if (!stockData || stockData.historicalData.length === 0) return <div>No data available</div>;

  const latestData = stockData.historicalData[stockData.historicalData.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ticker} Stock Info</CardTitle>
      </CardHeader>
      <CardContent>
        {latestData && (
          <>
            <p>Latest Close Price: ${latestData.close.toFixed(2)}</p>
            <p>Latest Date: {new Date(latestData.date).toLocaleDateString()}</p>
          </>
        )}
        <h3>Historical Data (Last 5 days):</h3>
        <ul>
          {stockData.historicalData.map((dataPoint, index) => (
            <li key={index}>
              Date: {new Date(dataPoint.date).toLocaleDateString()} - Close: ${dataPoint.close.toFixed(2)}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}