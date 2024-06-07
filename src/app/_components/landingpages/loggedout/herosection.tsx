

export default async function HeroSection() {


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

      </main>
    </div>
  );
}
