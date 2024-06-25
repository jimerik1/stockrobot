// components/TickerDashboard.tsx
import { Dashboard1 } from '../dashboard1';
import { Header } from '../header';
import { SidebarWrapper } from '../sidebar-wrapper';

interface TickerDashboardProps {
  ticker: string;
}

export const TickerDashboard: React.FC<TickerDashboardProps> = ({ ticker }) => {
  console.log('Ticker:', ticker);

  if (!ticker) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <SidebarWrapper />
      <Dashboard1 ticker={ticker} />
    </div>
  );
};