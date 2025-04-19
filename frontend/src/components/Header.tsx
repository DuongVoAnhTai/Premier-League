"use client";

import { getAllTeams } from "@/lib/api";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: teams = [], isLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar with Club Logos */}
      <div className="bg-gray-100 py-2 flex justify-center space-x-2 overflow-x-auto">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading teams...</div>
        ) : teams.length === 0 ? (
          <div className="text-center text-gray-500">No teams found.</div>
        ) : (
          teams.map((team) => (
            <Link href={`/clubs/${team.teamID}`} key={team.teamID}>
              <Image
                src={`/clubs/${team.logo}` || "/default-logo.png"}
                alt={`${team.name} logo`}
                width={30}
                height={30}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
          ))
        )}
      </div>

      {/* Main Header */}
      <div className="bg-[#38003C] text-white flex items-center justify-between px-6 py-4 shadow-md">
        {/* Logo */}
        <Link href="/home" className="flex items-center space-x-2">
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