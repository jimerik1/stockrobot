import React from 'react';
import { api } from '~/trpc/react';

interface IncomeStatementProps {
  ticker: string;
}

const IncomeStatement: React.FC<IncomeStatementProps> = ({ ticker }) => {
  const { data, error, isLoading } = api.ticker.getFinancials.useQuery({ ticker });

  console.log('IncomeStatement data:', data); // Log data
  console.log('IncomeStatement error:', error); // Log error
  console.log('IncomeStatement isLoading:', isLoading); // Log loading status

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading income statement data: {error.message}</div>;
  }

  return (
    <div>
      <h2>Income Statement</h2>
      <pre>{JSON.stringify(data?.incomeStatement, null, 2)}</pre>
    </div>
  );
};

export default IncomeStatement;