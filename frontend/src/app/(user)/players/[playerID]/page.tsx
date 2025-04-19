"use client";

import { getAllPlayers, getAllTeams } from "@/lib/api";
import { Player } from "@/types/player";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";

// Ánh xạ enum position sang tên hiển thị
const positionDisplayNames: { [key: string]: string } = {
  GOALKEEPER: "Goalkeeper",
  DEFENDER: "Defender",
  MIDFIELDER: "Midfielder",
  FORWARD: "Forward",
};

// Hàm tính tuổi từ birthDate
const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Định dạng ngày sinh
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function PlayerDetailPage() {
  const { playerID } = useParams();

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

  // Find the player by playerID
  const player = players.find((p) => p.playerID === playerID);

  // Find the team by teamID
  const team = player ? teams.find((t) => t.teamID === player.teamID) : null;

  if (playersLoading || teamsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!player) {
    return <div className="text-center py-10">Player not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            {/* Player Image Placeholder */}
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              No Image
            </div>

            {/* Player Details */}
            <div className="flex-1">
              {/* Player Name and Club with Logo */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">{player.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8">
                    <Image
                      src={team?.logo ? `/clubs/${team.logo}` : "/default-logo.png"}
                      alt={`${team?.name || "Club"} logo`}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600">{team?.name || "Unknown Club"}</p>
                    <span className="text-xs text-gray-500">
                      {team?.name.charAt(0) || ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Player Information */}
              <div>
                <h2 className="text-lg font-semibold text-[#38003C] mb-4">Player Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-gray-600">Position: </span>
                      {positionDisplayNames[player.position]}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">Nationality: </span>
                      {player.nationality}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-gray-600">Date of Birth: </span>
                      {formatDate(player.birthDate)}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">Age: </span>
                      {calculateAge(player.birthDate)} years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}