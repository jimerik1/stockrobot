// components/header.tsx
import Link from "next/link";
import { HeaderSearchBar } from "./headersearchbar";
import { getServerAuthSession } from "~/server/auth";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";

export async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Orders</Link>
        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Products</Link>
        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Customers</Link>
        <Link href="#" className="text-foreground transition-colors hover:text-foreground">Settings</Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Orders</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Products</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Customers</Link>
            <Link href="#" className="hover:text-foreground">Settings</Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Select defaultValue="dashboard1">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Dashboard" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="dashboard1">Trader</SelectItem>
                  <SelectItem value="dashboard2">Analyst</SelectItem>
                  <SelectItem value="dashboard3">Technical Indicators</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        <HeaderSearchBar />

        <div>Jim Strand</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Logout" : "Sign in"}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}