
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Header from "./header";
import Sidebar from "./sidebar";
import Old from "~/app/old";
import { Maindashboard } from "./test";
import { MainDashboard2 } from "./maindashboard";

export default async function LoggedInLandingPage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div>
    {/* <Header /> */}
   <Sidebar />
    <Old /> 
    {/* <Maindashboard /> */}
    <MainDashboard2 />
  </div>
  );
}