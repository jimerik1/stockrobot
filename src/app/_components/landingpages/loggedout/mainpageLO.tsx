import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ProductScreenshot from "./productscreenshot";

const stats = [
  { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
  { id: 2, name: 'Assets under holding', value: '$119 trillion' },
  { id: 3, name: 'New users annually', value: '46,000' },
]


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


        <section>
            <div className="bg-white py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section>
          <ProductScreenshot />
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
