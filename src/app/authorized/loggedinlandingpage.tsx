// loggedinlandingpage.tsx

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Header } from "./header/header";
import { SidebarWrapper } from "./sidebar/sidebar-wrapper";
import OverviewAnalyst from "./overviewanalyst/page";

export default async function LoggedInLandingPage() {
  const _hello = await api.post.hello({ text: "from tRPC" });
  const _session = await getServerAuthSession();

  // Get the ticker from the URL or use a default value
  const ticker = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() ?? 'TSLA' : 'TSLA';
  const initialPeriod = "1mo";

  return (
    <div> 
      <Header />
      <SidebarWrapper />
      <OverviewAnalyst />
    </div>
  );
}