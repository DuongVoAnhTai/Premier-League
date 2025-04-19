"use client";

import { getStandings, getTournaments } from "@/lib/api";
import { Standing } from "@/types/standing";
import { Tournament } from "@/types/tournament";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function StandingsPage() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  // Fetch standings
  const { data: standings = [], isLoading: standingsLoading } = useQuery<
    Standing[]
  >({
    queryKey: ["standings"],
    queryFn: getStandings,
  });

  // Fetch tournaments
  const { data: tournaments = [], isLoading: tournamentsLoading } = useQuery<
    Tournament[]
  >({
    queryKey: ["tournaments"],
    queryFn: getTournaments,
  });

  // Get the Premier League tournament (assuming there's one with this name)
  const premierLeagueTournament = tournaments.find(
    (tournament) => tournament.name === "National Championship 2025"
  );

  // Filter standings for the Premier League tournament
  const premierLeagueStandings = standings
    .filter(
      (standing) =>
        standing.tournamentID === premierLeagueTournament?.tournamentID
    )
    .sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  };

  // Format form for display (e.g., "WWDLW" -> colored circles)
  const formatForm = (form: string | null) => {
    if (!form) return [];
    return form.split("").map((result, index) => {
      const color =
        result === "W"
          ? "bg-green-500"
          : result === "D"
          ? "bg-blue-500"
          : "bg-red-500";
      return (
        <span
          key={index}
          className={`inline-block w-4 h-4 rounded-full text-center ${color} text-white text-xs flex items-center justify-center`}
        >
          {result}
        </span>
      );
    });
  };

  // Toggle expanded details
  const toggleExpand = (teamID: string) => {
    setExpandedTeam(expandedTeam === teamID ? null : teamID);
  };

  if (standingsLoading || tournamentsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!premierLeagueTournament) {
    return <div className="text-center py-10">Tournament not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-full mx-auto px-4">
        {/* Tournament Info */}
        <div className="bg-white border rounded-lg p-4 mb-6">
          <h1 className="text-xl font-bold">
            {premierLeagueTournament.name} 2024/25 (2024)
          </h1>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Status:</span>{" "}
            {premierLeagueTournament.status}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Start:</span>{" "}
            {formatDate(premierLeagueTournament.startDate)}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">End:</span>{" "}
            {premierLeagueTournament.endDate
              ? formatDate(premierLeagueTournament.endDate)
              : "TBD"}
          </p>
        </div>

        {/* Standings Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* Legend */}
          <div className="flex space-x-4 p-4 bg-[#38003C] text-white text-sm">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 mr-2"></span> Champions League qualification
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-orange-500 mr-2"></span> Europa League qualification
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-green-500 mr-2"></span> Conference League qualification
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-13 gap-4 p-4 bg-gray-100 font-semibold text-sm text-gray-700">
            <div>Position</div>
            <div className="col-span-2">Club</div>
            <div>Played</div>
            <div>Won</div>
            <div>Drawn</div>
            <div>Lost</div>
            <div>GF</div>
            <div>GA</div>
            <div>GD</div>
            <div>Points</div>
            <div>Form</div>
            <div>More</div>
          </div>

          {/* Table Rows */}
          {premierLeagueStandings.map((standing, index) => {
            const position = index + 1;
            const positionColor =
              position <= 3
                ? "border-l-4 border-blue-500 pl-3"
                : position === 4
                ? "border-l-4 border-orange-500 pl-3"
                : position === 5
                ? "border-l-4 border-green-500 pl-3"
                : "pl-4";

            return (
              <div key={standing.standingID}>
                <div
                  className={`grid grid-cols-13 gap-4 p-4 items-center border-b ${positionColor}`}
                >
                  <div>{position}</div>
                  <div className="col-span-2 flex items-center space-x-2">
                    {/* <img
                      src={standing.team.logo || "/default-logo.png"}
                      alt={standing.team.name}
                      className="w-6 h-6"
                    /> */}
                    <span>{standing.team.name}</span>
                  </div>
                  <div>{standing.played}</div>
                  <div>{standing.won}</div>
                  <div>{standing.draw}</div>
                  <div>{standing.lost}</div>
                  <div>{standing.goalsFor}</div>
                  <div>{standing.goalsAgainst}</div>
                  <div>{standing.goalDifference}</div>
                  <div>{standing.points}</div>
                  <div className="flex space-x-1">
                    {formatForm(standing.form)}
                  </div>
                  <button
                    onClick={() => toggleExpand(standing.teamID)}
                    className="text-[#38003C] hover:underline"
                  >
                    {expandedTeam === standing.teamID ? "▲" : "▼"}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedTeam === standing.teamID && (
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-semibold">Matches Played</p>
                        <p className="text-2xl">{standing.played}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Total Points</p>
                        <p className="text-2xl">{standing.points}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Win Rate</p>
                        <p className="text-2xl">
                          {standing.played
                            ? Math.round((standing.won / standing.played) * 100)
                            : 0}
                          %
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Goal Difference</p>
                        <p className="text-2xl">
                          {standing.goalDifference > 0 ? "+" : ""}
                          {standing.goalDifference}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold">Form Analysis (Last 5 Games)</p>
                      <p className="text-sm text-gray-600">Recent Form:</p>
                      <div className="flex space-x-1 mt-1">
                        {formatForm(standing.form)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}