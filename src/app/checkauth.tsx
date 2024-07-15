import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import MainLandingPage from "./_components/landingpages/mainlandingpage";
import LoggedInLandingPage from "./authorized/loggedinlandingpage";
/* eslint-disable  @typescript-eslint/no-explicit-any */

type Session = {
  user: any; // replace `any` with the actual user type if known
};

type Message = {
  greeting: string;
}

const LoggedOutContent = ({ message }: { message: Message }) => (
  <MainLandingPage />
);

const LoggedInContent = ({ session }: { session: Session }) => (
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

export default async function CheckAuth() {
  const message = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main>
      {session ? (
        <LoggedInContent session={session} />
      ) : (
        <LoggedOutContent message={message} />
      )}
    </main>
  );
}
