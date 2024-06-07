import React from "react";
import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Old from "./old";
import Header from "./_components/nav/header";
import Sidebar from "./_components/nav/sidebar";
import MainLandingPage from "./_components/landingpages/loggedout/mainlandingpage";
import LoggedInLandingPage from "./_components/landingpages/loggedin/loggedinlandingpage";

const LoggedOutContent = ({ hello }: { hello: any }) => (
      <MainLandingPage />
);

const LoggedInContent = ({ session }: { session: any }) => (

      <LoggedInUser />

);

async function LoggedInUser() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <LoggedInLandingPage />
  );
}

export default async function IntroPage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main>
      {session ? (
        <LoggedInContent session={session} />
      ) : (
        <LoggedOutContent hello={hello} />
      )}
    </main>
  );
}
