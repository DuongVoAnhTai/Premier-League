"use client";

import { getAllPlayers, getAllTeams } from "@/lib/api";
import { Player } from "@/types/player";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Ánh xạ enum position sang tên hiển thị
const positionDisplayNames: { [key: string]: string } = {
  GOALKEEPER: "Goalkeeper",
  DEFENDER: "Defender",
  MIDFIELDER: "Midfielder",
  FORWARD: "Forward",
};

export default function PlayersPage() {
  // State cho tìm kiếm và bộ lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState<string>("all");

  // Fetch players
  const { data: players = [], isLoading: playersLoading } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: getAllPlayers,
  });

  // Fetch teams
  const { data: teams = [], isLoading: teamsLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });

  // Lọc cầu thủ theo tìm kiếm và câu lạc bộ
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClub =
      selectedClub === "all" || player.teamID === selectedClub;
    return matchesSearch && matchesClub;
  });

  // Reset bộ lọc
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedClub("all");
  };

  if (playersLoading || teamsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 px-8 rounded-t-lg flex justify-between items-center">
          <h1 className="text-3xl font-bold">Players</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a player"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border rounded-b-lg p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <label htmlFor="club-filter" className="font-semibold text-gray-600">
              Filter by Club:
            </label>
            <select
              id="club-filter"
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Clubs</option>
              {teams.map((team) => (
                <option key={team.teamID} value={team.teamID}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleResetFilters}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Players Table */}
        <div className="bg-white border rounded-lg mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm font-semibold">
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Nationality</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                    No players found.
                  </td>
                </tr>
              ) : (
                filteredPlayers.map((player) => {
                  const team = teams.find((t) => t.teamID === player.teamID);
                  const playerInitial = team?.name.charAt(0) || "";
                  return (
                    <tr
                      key={player.playerID}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <Link
                          href={`/players/${player.playerID}`}
                          className="flex items-center space-x-3 text-blue-600 hover:underline"
                        >
                          <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                            {playerInitial}
                          </span>
                          <span>{player.name}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        {positionDisplayNames[player.position]}
                      </td>
                      <td className="py-3 px-4 flex items-center space-x-2">
                        <Image
                            src={`/nationalities/${player.image}` || "/default-logo.png"}
                          alt=""
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                        <span>{player.nationality}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}