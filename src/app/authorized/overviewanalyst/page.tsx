import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { StockPriceChart } from "./charts/stockpricechart";

export default function OverviewAnalyst() {;


    return (
  <div>

    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex flex-col w-full bg-muted/40">
          <div className="grid pl-16 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 h-full">

            <Card className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-3 flex flex-col">
                <CardContent className="flex-grow overflow-auto">

                <StockPriceChart />

                </CardContent>
            </Card>

            <Card className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-3 flex flex-col">
                  <CardHeader className="bg-slate-100">
                <CardTitle>2</CardTitle>
                  </CardHeader>
                <CardContent className="flex-grow overflow-auto">

                </CardContent>
            </Card>
          
            <Card className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-3 flex flex-col">
                  <CardHeader>
                <CardTitle>3</CardTitle>
                  </CardHeader>
                <CardContent className="flex-grow overflow-auto">
                  3
                </CardContent>
            </Card>

            <Card className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-3 flex flex-col">
                  <CardHeader>
                <CardTitle>4</CardTitle>
                  </CardHeader>
                <CardContent className="flex-grow overflow-auto">
                  4
                </CardContent>
            </Card>

            </div>      
          </div>
        </div>
      </div>

    );
  };