import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Dashboard1 } from "./dashboard1";
import { Dashboard2 } from "./dashboard2";
import { Header } from "./header";
import { SidebarWrapper } from "./sidebar-wrapper";
import Old from "~/app/old";

export default async function LoggedInLandingPage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  // Get the ticker from the URL or use a default value
  const ticker = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || 'TSLA' : 'TSLA';
  const initialPeriod = "1mo"; // You can change this default value as needed

  return (
    <div>
      <Header />
      <SidebarWrapper />
      <Dashboard1 ticker={ticker} initialPeriod={initialPeriod} />
      <Dashboard2 />
      <Old />
    </div>
  );
}