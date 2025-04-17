import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Banner Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/banner-bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white p-8 rounded-lg backdrop-blur-sm bg-white/20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Premier League
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Experience the passion, drama and excitement of the world’s most-watched football league.
          </p>
          <Link href="/fixtures">
            <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-[#4A004F] transition uppercase">
              View Schedules
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}