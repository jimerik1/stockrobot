import * as React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Card1Client from "./Card1Client";  // Adjust the import path as necessary

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

export async function Dashboard1() {
  const session = await getServerAuthSession();
  const initialStockData: StockData[] = await api.stock.getStockData({ count: 10 });

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
        <div className="grid pl-16 px-2 py-2 gap-8 grid-cols-8 grid-rows-12 h-full">
          <Card className="grid col-span-5 row-span-6">
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Card1Client initialStockData={initialStockData} />
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