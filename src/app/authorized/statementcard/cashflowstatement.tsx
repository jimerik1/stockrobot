import React from 'react';
import { api } from '~/trpc/react';

interface CashFlowStatementProps {
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

const CashFlowStatement: React.FC<CashFlowStatementProps> = ({ ticker }) => {
  const { data, error, isLoading } = api.ticker.getFinancials.useQuery({ ticker });

  console.log('CashFlowStatement data:', data); // Log data
  console.log('CashFlowStatement error:', error); // Log error
  console.log('CashFlowStatement isLoading:', isLoading); // Log loading status

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cash flow statement data: {error.message}</div>;
  }

  const cashFlow = (data as FinancialsData)?.cashFlow;

  return (
    <div>
      <h2>Cash Flow Statement</h2>
      <pre>{JSON.stringify(cashFlow, null, 2)}</pre>
    </div>
  );
};

export default CashFlowStatement;