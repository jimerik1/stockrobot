import React from 'react';
import { api } from '~/trpc/react';

interface BalanceSheetProps {
  ticker: string;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({ ticker }) => {
  const { data, error, isLoading } = api.ticker.getFinancials.useQuery({ ticker });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading balance sheet data</div>;
  }

  return (
    <div>
      <h2>Balance Sheet</h2>
      <pre>{JSON.stringify(data?.balanceSheet, null, 2)}</pre>
    </div>
  );
};

export default BalanceSheet;