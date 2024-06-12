import * as React from "react"
import { getServerAuthSession } from "~/server/auth";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

import {

  File,
  ListFilter,

} from "lucide-react"


import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

import { Progress } from "../../../components/ui/progress"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs"


export async function Dashboard1() {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen w-full flex-col">

    
  <main>
  <div className="flex min-h-screen w-full flex-col bg-muted/40">

   
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
   
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-1">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-3" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-2xl text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>
           
      
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                   {/* <OrderList /> */}
              </TabsContent>
              <TabsContent value="month">
                   {/* <OrderList /> */}
              </TabsContent>
            </Tabs>
          </div>
          <div>
           {/* <OrderConfirmationCard /> */}
          </div>
        </main>
      </div>
    </div>

</main>

  </div>

  )
}
