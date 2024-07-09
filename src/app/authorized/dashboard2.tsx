/* eslint-disable */
"use client";

import React from 'react';
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
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full bg-muted/40">
        <div className="grid pl-16 grid-cols-8 grid-rows-6 gap-1 h-full">
          <LargeStockpriceChartCard />
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