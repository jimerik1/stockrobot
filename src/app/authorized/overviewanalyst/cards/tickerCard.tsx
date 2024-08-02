import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {   
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardTitle } from "~/components/ui/card";

interface Ticker {
  symbol: string;
  recommendation: string;
  comment: string;
  taScore: string;
}

interface DailySummary {
  date: Date;
  ticker: string | null;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  summaryText: string;
  tickerText: string | null;
}

interface TickerData {
  tickers: string[];
}

function useUTCDate() {
  return useState(() => {
    const now = new Date();
    const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    utcDate.setUTCHours(0, 0, 0, 0);
    return utcDate;
  })[0];
}

function getRecommendation(): string {
  return "Recommendation";
}

function getComment(): string {
  return "Comment";
}

function getTAScore(): string {
  return "Score";
}

export function TickerCard() {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const queryDate = useUTCDate();

  const { data: dailySummary, isLoading, error } = api.getData.getDailySummary.useQuery(
    { date: queryDate },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (dailySummary?.tickerText) {
      try {
        const tickerData = JSON.parse(dailySummary.tickerText) as TickerData;
        if (Array.isArray(tickerData.tickers)) {
          const processedTickers: Ticker[] = tickerData.tickers.map((ticker: string) => ({
            symbol: ticker,
            recommendation: getRecommendation(),
            comment: getComment(),
            taScore: getTAScore(),
          }));
          setTickers(processedTickers);
        }
      } catch (e) {
        console.error("Error parsing ticker data:", e);
      }
    }
  }, [dailySummary]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (tickers.length === 0) return <div>No ticker data available for {queryDate.toDateString()}</div>;

  return (
    <Card className="col-span-1 row-span-1 flex flex-col">
      <CardTitle className="py-2 px-2">Tickers mentioned on {queryDate.toDateString()}</CardTitle>
      <Table>
        <TableCaption>Tickers mentioned on {queryDate.toDateString()}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticker</TableHead>
            <TableHead>Recommendation</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">TA Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickers.map((ticker, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{ticker.symbol}</TableCell>
              <TableCell>{ticker.recommendation}</TableCell>
              <TableCell>{ticker.comment}</TableCell>
              <TableCell className="text-right">{ticker.taScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}