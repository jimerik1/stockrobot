// src/app/authorized/[ticker]/page.tsx

import { TickerDashboard } from "./tickerdashboard"; // Update the import path as necessary

interface PageProps {
  params: {
    ticker: string;
  };
  searchParams: {
    dashboard?: string;
  };
}

const Page = ({ params, searchParams }: PageProps) => {
  const { ticker } = params;
  const { dashboard } = searchParams;

  return <TickerDashboard ticker={ticker} currentDashboard={dashboard ?? "dashboard1"} />;
};

export default Page;