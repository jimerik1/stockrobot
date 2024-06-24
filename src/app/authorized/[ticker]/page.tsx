// src/app/authorized/[ticker]/page.tsx
import { TickerDashboard } from "./tickerdashboard";

interface PageProps {
  params: {
    ticker: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { ticker } = params;

  return <TickerDashboard ticker={ticker} />;
};

export default Page;