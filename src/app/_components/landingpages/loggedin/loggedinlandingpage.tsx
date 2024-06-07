
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";
import Header from "../../nav/header";
import Sidebar from "../../nav/sidebar";
import Old from "~/app/old";

export default async function LoggedInLandingPage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div>
    <Header />
    <Sidebar />
    <Old />
  </div>
  );
}