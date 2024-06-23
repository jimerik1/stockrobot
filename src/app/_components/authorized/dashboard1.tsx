import * as React from "react";
import { getServerAuthSession } from "~/server/auth";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

import { File, ListFilter } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import { Progress } from "../../../components/ui/progress";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

export async function Dashboard1() {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-20">
        <div className="grid pl-16 px-2 py-2 gap-8 grid-cols-8 grid-rows-12 h-full">
          <Card className="grid col-span-5 row-span-6">1</Card>
          <Card className="grid col-span-3 row-span-12">2</Card>
          <Card className="grid col-span-2 row-span-6">3</Card>
          <Card className="grid col-span-3 row-span-6">4</Card>

        </div>
      </div>
    </div>
  );
}