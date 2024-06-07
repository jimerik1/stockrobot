import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Old from "./old";
import Header from "./_components/nav/header";
import Sidebar from "./_components/nav/sidebar";
import MainLandingPage from "./_components/landingpages/loggedout/mainlandingpage";
import LoggedInLandingPage from "./_components/landingpages/loggedin/loggedinlandingpage";

interface HelloProps {
  greeting: string;
}

interface User {
  name: string;
  email: string;
}

interface Session {
  user: User;
}

interface Props {
  hello: HelloProps;
  session: Session | null;
}

const LoggedOutContent = ({ hello }: { hello: HelloProps }) => (
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

const IntroPage = ({ hello, session }: Props) => {
  return (
    <main>
      {session ? (
        <LoggedInContent session={session} />
      ) : (
        <LoggedOutContent hello={hello} />
      )}
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white">
          {hello ? hello.greeting : "Loading tRPC query..."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hello: HelloProps = await api.post.hello({ text: "from tRPC" });
  const session: Session | null = await getServerAuthSession(context);

  return {
    props: {
      hello,
      session,
    },
  };
};

export default IntroPage;
