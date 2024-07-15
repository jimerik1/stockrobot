// components/tickerdashboard.tsx

import { Dashboard1 } from '../dashboard1';
import { Dashboard2 } from '../dashboard2';
import { Header } from '../../header/header';
import { SidebarWrapper } from '../../sidebar/sidebar-wrapper';

interface TickerDashboardProps {
  ticker: string;
  currentDashboard: string;
}

export const TickerDashboard: React.FC<TickerDashboardProps> = ({ ticker, currentDashboard }) => {
  console.log('Ticker:', ticker);

  if (!ticker) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <SidebarWrapper />
      {currentDashboard === "dashboard1" ? (
        <Dashboard1 ticker={ticker} initialPeriod="1mo" />
      ) : (
        <Dashboard2 ticker={ticker} initialPeriod="1mo" />
      )}
    </div>
  );
};