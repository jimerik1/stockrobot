import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";
import HeaderLO from "./header";

export default async function MainLandingPageLO() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div className="container mx-auto px-4">
      <main>
        {/* Hero Section */}
        <section className="hero bg-gray-100 py-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Automated indicator warnings
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8">
          Discover exceptional investment opportunities with automated indicator warnings.          
          </p>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Hero Image"
            className="w-full md:w-1/2 h-auto"
          />
        </section>

        {/* Normal Content Section */}
        <section className="content py-8">
          <div className="flex justify-center box-border h-32 p-4 border-2 w-full md:w-3/4 mx-auto">
            {hello.greeting}
          </div>
          {/* Add more content here as needed */}
        </section>
      </main>
    </div>
  );
}
