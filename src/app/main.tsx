
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import IntroPage from "./intropage";

export default async function Main() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div>
        <IntroPage />
    </div>
  );
}