"use client";

import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { api } from "~/trpc/react"; // Adjust the import path as necessary

interface StockData {
  id: number;
  ticker: string;
  priceOpen: number;
  priceHigh: number;
  priceLow: number;
  priceClose: number;
  unit: string;
  date: Date;
  Volume: number;
}

interface Card1ClientProps {
  initialStockData: StockData[];
}

export default function Card1Client({ initialStockData }: Card1ClientProps) {
  const [count, setCount] = useState<number>(10);

  const { data: stockData, refetch } = api.stock.getStockData.useQuery(
    { count },
    {
      initialData: initialStockData,
      enabled: false, // disable automatic fetching
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(e.target.value, 10));
  };

  const handleButtonClick = async () => {
    await refetch();
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="number"
          value={count}
          onChange={handleInputChange}
          className="w-full rounded-full px-4 py-2 text-black"
          min="1"
        />
        <button
          onClick={handleButtonClick}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 mt-2"
        >
          OK
        </button>
      </div>
      {stockData.length > 0 ? (
        stockData.map((stock, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-bold">{stock.ticker}</p>
            <p>Date: {format(new Date(stock.date), 'MM/dd/yyyy')}</p>  
            <p>Open: {stock.priceOpen}</p>
            <p>High: {stock.priceHigh}</p>
            <p>Low: {stock.priceLow}</p>
            <p>Close: {stock.priceClose}</p>
            <p>Volume: {stock.Volume}</p>
          </div>
        ))
      ) : (
        <p>No stock data available.</p>
      )}
    </div>
  );
}