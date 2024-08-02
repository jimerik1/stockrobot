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

export function TickerCard() {
  return (
    <Card className="col-span-1 row-span-1 flex flex-col">
      <CardTitle className="py-2 px-2">Tickers mentioned today</CardTitle>
      <Table>
  <TableCaption>Tickers mentioned today.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Ticker</TableHead>
      <TableHead>Recommendation</TableHead>
      <TableHead>Comment</TableHead>
      <TableHead className="text-right">TA Score</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">MSFT</TableCell>
      <TableCell>Buy</TableCell>
      <TableCell>Strong signals</TableCell>
      <TableCell className="text-right">11</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">TSLA</TableCell>
      <TableCell>Sell</TableCell>
      <TableCell>Indicators showing decline</TableCell>
      <TableCell className="text-right">3</TableCell>
    </TableRow>
  </TableBody>
</Table>

    </Card>
  );
}