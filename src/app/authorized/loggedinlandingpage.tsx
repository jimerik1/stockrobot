// loggedinlandingpage.tsx

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Header } from "./header/header";
import { SidebarWrapper } from "./sidebar/sidebar-wrapper";
import OverviewAnalyst from "./overviewanalyst/pagecontent";

export default async function LoggedInLandingPage() {
  const _hello = await api.post.hello({ text: "from tRPC" });
  const _session = await getServerAuthSession();

  return (
    <div> 
      <Header />
      <SidebarWrapper />
      <OverviewAnalyst />
    </div>
  );
}