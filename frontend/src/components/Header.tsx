"use client";

import Image from "next/image";
import Link from "next/link";

const clubLogos = [
  "/clubs/arsenal.png",
  "/clubs/aston-villa.png",
  "/clubs/bournemouth.png",
  "/clubs/brentford.png",
  "/clubs/brighton.png",
//   "/clubs/chelsea.png",
//   "/clubs/crystal-palace.png",
//   "/clubs/everton.png",
//   "/clubs/fulham.png",
//   "/clubs/leeds.png",
//   "/clubs/leicester.png",
//   "/clubs/liverpool.png",
//   "/clubs/man-city.png",
//   "/clubs/man-united.png",
//   "/clubs/newcastle.png",
//   "/clubs/norwich.png",
//   "/clubs/southampton.png",
//   "/clubs/tottenham.png",
//   "/clubs/watford.png",
//   "/clubs/west-ham.png",
//   "/clubs/wolves.png",
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar with Club Logos */}
      <div className="bg-gray-100 py-2 flex justify-center space-x-2 overflow-x-auto">
        {clubLogos.map((logo, index) => (
          <Link href="/clubs" key={index}>
            <Image
              src={logo}
              alt={`Club ${index + 1}`}
              width={30}
              height={30}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        ))}
      </div>

      {/* Main Header */}
      <div className="bg-[#38003C] text-white flex items-center justify-between px-6 py-4 shadow-md">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Premier League Logo"
            width={40}
            height={40}
            className="rounded-full bg-white p-1"
          />
          <span className="text-xl font-bold">Premier League</span>
        </Link>

        {/* Right Side Links */}
        <div className="flex items-center space-x-6">
          <Link href="/about" className="text-sm hover:underline">
            About the author
          </Link>
          <Link href="/project" className="text-sm hover:underline">
            More about the project
          </Link>
          <Link href="/more" className="text-sm hover:underline">
            More than a game
          </Link>
          <Link href="/sign-in" className="text-sm hover:underline">
            Sign In
          </Link>
          <Link href="/search">
            <Image
              src="/search.png"
              alt="Search"
              width={20}
              height={20}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-center space-x-6">
          <Link href="/home" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/fixtures" className="text-blue-600 hover:underline">
            Fixtures
          </Link>
          <Link href="/results" className="text-blue-600 hover:underline">
            Results
          </Link>
          <Link href="/standings" className="text-blue-600 hover:underline">
            Standings
          </Link>
          <Link href="/news" className="text-blue-600 hover:underline">
            News
          </Link>
          <Link href="/videos" className="text-blue-600 hover:underline">
            Videos
          </Link>
          <Link href="/clubs" className="text-blue-600 hover:underline">
            Clubs
          </Link>
          <Link href="/players" className="text-blue-600 hover:underline">
            Players
          </Link>
        </div>
      </nav>
    </header>
  );
}