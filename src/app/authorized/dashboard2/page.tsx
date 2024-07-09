import { Dashboard2 } from '../dashboard2';
import { Header } from '../header';
import { SidebarWrapper } from '../sidebar-wrapper';


export default function Dashboard1Page() {;

  return (
    <div>
      <Header />
      <SidebarWrapper />
      <Dashboard2 ticker="AAPL" initialPeriod="1mo" />
    </div>
  );
};