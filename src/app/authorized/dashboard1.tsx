// Dashboard1.tsx
import * as React from "react";
import { api } from "~/trpc/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import StockChart from "./stockchart";

interface Dashboard1Props {
  ticker?: string;
}

export async function Dashboard1({ ticker = "TSLA" }: Dashboard1Props) {
  const stockData = await api.stock.getStockData({ count: 30, ticker });

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
        <div className="grid pl-16 px-2 py-2 gap-8 grid-cols-8 grid-rows-12 h-full">
          <Card className="grid col-span-5 row-span-6">
            <CardHeader >
              <CardTitle>{ticker} Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <StockChart data={stockData} />
            </CardContent>
          </Card>
          <Card className="grid col-span-3 row-span-12">2</Card>
          <Card className="grid col-span-2 row-span-6">3</Card>
          <Card className="grid col-span-3 row-span-6">4</Card>
        </div>
      </div>
    </div>
  );
}