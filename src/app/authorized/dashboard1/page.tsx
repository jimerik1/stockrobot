import { Dashboard1 } from '../dashboard1';
import { Header } from '../header';
import { SidebarWrapper } from '../sidebar-wrapper';


export default function Dashboard1Page() {;

  return (
    <div>
      <Header />
      <SidebarWrapper />
      <Dashboard1 ticker="AAPL" initialPeriod="1mo" />
    </div>
  );
};