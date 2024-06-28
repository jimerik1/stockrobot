import React from 'react';
import { api } from '~/trpc/react';

interface CashFlowStatementProps {
  ticker: string;
}

const CashFlowStatement: React.FC<CashFlowStatementProps> = ({ ticker }) => {
  const { data, error, isLoading } = api.ticker.getFinancials.useQuery({ ticker });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cash flow statement data</div>;
  }

  return (
    <div>
      <h2>Cash Flow Statement</h2>
      <pre>{JSON.stringify(data?.cashFlow, null, 2)}</pre>
    </div>
  );
};

export default CashFlowStatement;