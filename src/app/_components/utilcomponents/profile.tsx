import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Profile() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
<div>
    Jim Strand
</div>

  );
}

async function CrudShowcase() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;
  
    const latestPost = await api.post.getLatest();
  
    return (
      <div className="w-full max-w-xs">
        {latestPost ? (
          <p className="truncate">Your most recent post: {latestPost.name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}
  
        <CreatePost />
      </div>
    );
  }
  