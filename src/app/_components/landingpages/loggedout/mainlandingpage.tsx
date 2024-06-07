
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";
import HeaderLO from "./header";
import MainLandingPageLO from "./mainpageLO";


export default async function MainLandingPage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div>

    <HeaderLO />
    <MainLandingPageLO />

    </div>
  );
}