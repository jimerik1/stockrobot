// components/TickerDashboard.tsx
import { Dashboard1 } from '../dashboard1';
import { Header } from '../header';
import { Sidebar } from '../sidebar';

interface TickerDashboardProps {
  ticker: string;
}

export const TickerDashboard: React.FC<TickerDashboardProps> = ({ ticker }) => {
  console.log('Ticker:', ticker);

  if (!ticker) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Sidebar />
      <Dashboard1 ticker={ticker} />
    </div>
  );
};