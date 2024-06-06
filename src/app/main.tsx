
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Header from "./_components/nav/header";
import Sidebar from "./_components/nav/sidebar";

export default async function Main() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div>
        <Header />
        <Sidebar />
    </div>
  );
}