
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Dashboard1 } from "./dashboard1";
import { Dashboard2 } from "./dashboard2";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import Old from "~/app/old";


export default async function LoggedInLandingPage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div>
    <Header />
    <Sidebar />
    <Dashboard1 />
    <Dashboard2 />
    <Old />
  </div>
  );
}