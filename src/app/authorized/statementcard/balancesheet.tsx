/* eslint-disable */
import React from 'react';
import { api } from '~/trpc/react';

interface BalanceSheetProps {
  ticker: string;
}

interface FinancialsData {
  incomeStatement: Record<string, any>;
  quarterlyIncomeStatement: Record<string, any>;
  balanceSheet: Record<string, any>;
  quarterlyBalanceSheet: Record<string, any>;
  cashFlow: Record<string, any>;
  quarterlyCashFlow: Record<string, any>;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({ ticker }) => {
  const { data, error, isLoading } = api.ticker.getFinancials.useQuery({ ticker });

  console.log('BalanceSheet data:', data); // Log data
  console.log('BalanceSheet error:', error); // Log error
  console.log('BalanceSheet isLoading:', isLoading); // Log loading status

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading balance sheet data: {error.message}</div>;
  }

  const balanceSheet = (data as FinancialsData)?.balanceSheet;

  return (
    <div>
      <h2>Balance Sheet</h2>
      <pre>{JSON.stringify(balanceSheet, null, 2)}</pre>
    </div>
  );
};

export default BalanceSheet;