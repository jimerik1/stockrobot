import React from 'react';
import { api } from '~/trpc/react';

interface OwnersProps {
  ticker: string;
}

const Owners: React.FC<OwnersProps> = ({ ticker }) => {
  const { data, error, isLoading } = api.ticker.getHolders.useQuery({ ticker });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading holders data</div>;
  }

  return (
    <div>
      <h2>Owners</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Owners;