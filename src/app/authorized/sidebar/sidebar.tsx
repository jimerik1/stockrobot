// src/app/authorized/sidebar.tsx

import Link from "next/link"
import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
  Package2,
} from "lucide-react"

type NavItemProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  isExpanded: boolean;
}

function NavItem({ href, icon: Icon, label, isExpanded }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex h-9 w-full items-center gap-2 rounded-lg px-3 text-muted-foreground transition-colors hover:text-foreground overflow-hidden"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
        {label}
      </span>
    </Link>
  );
}

type SidebarProps = {
  isExpanded: boolean;
}

export function Sidebar({ isExpanded }: SidebarProps) {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link href="/" className="group flex h-9 w-full items-center gap-2 rounded-lg px-3 text-lg font-semibold">
          <Package2 className="h-6 w-6 shrink-0" />
          {isExpanded && <span className="hidden sm:inline">Jims App</span>}
        </Link>
        <NavItem href="/authorized/old/dashboard1" icon={Home} label="Dashboard 1" isExpanded={isExpanded} />
        <NavItem href="/authorized/old/dashboard2" icon={ShoppingCart} label="Dashboard 2" isExpanded={isExpanded} />
        <NavItem href="/authorized/old/orders" icon={ShoppingCart} label="Orders" isExpanded={isExpanded} />
        <NavItem href="/authorized/old/products" icon={Package} label="Products" isExpanded={isExpanded} />
        <NavItem href="/authorized/old/customers" icon={Users2} label="Customers" isExpanded={isExpanded} />
        <NavItem href="/authorized/old/analytics" icon={LineChart} label="Analytics" isExpanded={isExpanded} />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <NavItem href="/settings" icon={Settings} label="Settings" isExpanded={isExpanded} />
      </nav>
    </aside>
  );
}