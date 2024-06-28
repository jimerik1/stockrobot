/* eslint-disable */
import React from 'react';
import { api } from '~/trpc/react';

interface OwnersProps {
  ticker: string;
}

interface HoldersData {
  majorHolders: Record<string, any>;
  institutionalHolders: Record<string, any>;
  mutualFundHolders: Record<string, any>;
}

const Owners: React.FC<OwnersProps> = ({ ticker }) => {
  const { data, error, isLoading } = api.ticker.getHolders.useQuery({ ticker });

  console.log('Owners data:', data); // Log data
  console.log('Owners error:', error); // Log error
  console.log('Owners isLoading:', isLoading); // Log loading status

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading owners data: {error.message}</div>;
  }

  const majorHolders = (data as HoldersData)?.majorHolders;

  return (
    <div>
      <h2>Owners</h2>
      <pre>{JSON.stringify(majorHolders, null, 2)}</pre>
    </div>
  );
};

export default Owners;