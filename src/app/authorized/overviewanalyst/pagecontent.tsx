'use client';

import { DailySummaryCard } from "./cards/dailySummaryCard";
import { TickerCard } from "./cards/tickerCard";

export default function OverviewAnalyst() {
  return (
    <div>
      <div className="flex h-screen w-full overflow-hidden">
        <div className="flex flex-col w-full bg-muted/40">
          <div className="grid pl-0 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 sm:pl-16 xl:grid-cols-2 grid-rows-1 xl:pl-16 h-full">
            <DailySummaryCard />
            <TickerCard />
          </div>      
        </div>
      </div>
    </div>
  );
}
