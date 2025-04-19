"use client";

import { getAllTeams, getAllPlayers } from "@/lib/api";
import { Team } from "@/types/team";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";

// Ánh xạ enum position sang tên hiển thị
const positionDisplayNames: { [key: string]: string } = {
  GOALKEEPER: "Goalkeepers",
  DEFENDER: "Defenders",
  MIDFIELDER: "Midfielders",
  FORWARD: "Forwards",
};

export default function TeamDetailPage() {
  const { teamID } = useParams();

  // Fetch team details
  const { data: teams = [], isLoading: teamsLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });

  // Fetch players
  const { data: players = [], isLoading: playersLoading } = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: getAllPlayers,
  });

  // Find the team by teamID
  const team = teams.find((t) => t.teamID === teamID);

  // Filter players by teamID and group by position
  const teamPlayers = players.filter((p) => p.teamID === teamID);
  const groupedPlayers: { [key: string]: Player[] } = {
    GOALKEEPER: teamPlayers.filter((p) => p.position === "GOALKEEPER"),
    DEFENDER: teamPlayers.filter((p) => p.position === "DEFENDER"),
    MIDFIELDER: teamPlayers.filter((p) => p.position === "MIDFIELDER"),
    FORWARD: teamPlayers.filter((p) => p.position === "FORWARD"),
  };

  if (teamsLoading || playersLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!team) {
    return <div className="text-center py-10">Team not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Team Header */}
        <div className="bg-[#C8102E] text-white py-6 px-8 flex items-center space-x-6 rounded-t-lg">
          <Image
            src={`/clubs/${team.logo}` || "/default-logo.png"}
            alt={`${team.name} logo`}
            width={80}
            height={80}
            className="object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">{team.name}</h1>
            <p className="text-sm">{team.city}</p>
          </div>
        </div>

        {/* Team Information */}
        <div className="bg-white border rounded-b-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[#38003C] mb-4">Club Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-600">City: </span>
              <span>{team.city}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Country: </span>
              <span>{team.country}</span>
            </div>
          </div>
        </div>

        {/* Players by Position */}
        {["GOALKEEPER", "DEFENDER", "MIDFIELDER", "FORWARD"].map((position) => (
          groupedPlayers[position].length > 0 && (
            <div key={position} className="mb-8">
              <h2 className="text-xl font-bold text-[#38003C] mb-4">
                {positionDisplayNames[position]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {groupedPlayers[position].map((player) => (
                  <div
                    key={player.playerID}
                    className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{player.name}</h3>
                    <p className="text-sm text-gray-600">
                      {positionDisplayNames[player.position].slice(0, -1)} {/* Loại bỏ 's' */}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}