"use client";

import { getAllTeams } from "@/lib/api";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

export default function ClubsPage() {
  // Fetch teams
  const { data: teams = [], isLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center mb-8">
          Premier League Teams
        </h1>

        {/* Teams Grid */}
        {teams.length === 0 ? (
          <div className="text-center text-gray-500">No teams found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div
                key={team.teamID}
                className="bg-white border rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  {/* Team Logo */}
                  <Image
                    src={`/clubs/${team.logo}` || "/default-logo.png"}
                    alt={`${team.name} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  {/* Team Name */}
                  <span className="font-medium text-gray-800">{team.name}</span>
                </div>
                {/* Arrow Button */}
                <Link href={`/clubs/${team.teamID}`}>
                  <button className="text-[#38003C] hover:opacity-80 transition-opacity cursor-pointer hover:bg-gray-200 hover:rounded-xl p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}