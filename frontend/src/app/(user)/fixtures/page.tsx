"use client";

import { getAllMatches, getTournaments, getAllTeams } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

interface Match {
  matchID: string;
  matchDate: string;
  time: string;
  status: "LIVE" | "FINISHED" | "CANCELLED";
  homeScore: number;
  awayScore: number;
  tournamentID: string;
  homeTeamID: string;
  awayTeamID: string;
  tournament: { name: string };
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
}

interface Tournament {
  tournamentID: string;
  name: string;
}

interface Team {
  teamID: string;
  name: string;
}

export default function FixturesPage() {
  // State for filters
  const [selectedTournament, setSelectedTournament] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");

  // Fetch tournaments
  const { data: tournaments = [], isLoading: tournamentsLoading } = useQuery<
    Tournament[]
  >({
    queryKey: ["tournaments"],
    queryFn: getTournaments,
  });

  // Fetch teams
  const { data: teams = [], isLoading: teamsLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });

  // Fetch matches
  const { data: matches = [], isLoading: matchesLoading } = useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: getAllMatches,
  });

  // Filter matches based on selected tournament and team
  const filteredMatches = matches.filter((match) => {
    const matchTournament = match.tournamentID;
    const matchTeams = [match.homeTeamID, match.awayTeamID];

    const tournamentMatch =
      selectedTournament === "all" || matchTournament === selectedTournament;
    const teamMatch =
      selectedTeam === "all" || matchTeams.includes(selectedTeam);

    return tournamentMatch && teamMatch;
  });

  // Reset filters
  const handleResetFilters = () => {
    setSelectedTournament("all");
    setSelectedTeam("all");
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).toUpperCase();
  };

  if (tournamentsLoading || teamsLoading || matchesLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            {/* Filter by Tournament */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Competition
              </label>
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="w-full md:w-48 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#38003C]"
              >
                <option value="all">All Competitions</option>
                {tournaments.map((tournament) => (
                  <option
                    key={tournament.tournamentID}
                    value={tournament.tournamentID}
                  >
                    {tournament.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Team */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Club
              </label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full md:w-48 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#38003C]"
              >
                <option value="all">All Teams</option>
                {teams.map((team) => (
                  <option key={team.teamID} value={team.teamID}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            className="flex items-center text-[#38003C] hover:underline"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            RESET FILTERS
          </button>
        </div>

        {/* Match Summary */}
        <div className="bg-gray-200 text-gray-700 text-sm py-2 px-4 rounded mb-6">
          Showing {filteredMatches.length} of {matches.length} matches
        </div>

        {/* Match Cards */}
        <div className="space-y-6">
          {filteredMatches.length === 0 ? (
            <div className="text-center text-gray-500">No matches found.</div>
          ) : (
            filteredMatches.map((match) => (
              <div
                key={match.matchID}
                className="bg-white border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <div className="text-[#38003C] font-bold uppercase">
                    {formatDate(match.matchDate)}
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={match.homeTeam.logo || "/default-logo.png"}
                        alt={match.homeTeam.name}
                        className="w-8 h-8"
                      />
                      <span>{match.homeTeam.name}</span>
                    </div>
                    <span className="text-gray-500">{match.time}</span>
                    <div className="flex items-center space-x-2">
                      <img
                        src={match.awayTeam.logo || "/default-logo.png"}
                        alt={match.awayTeam.name}
                        className="w-8 h-8"
                      />
                      <span>{match.awayTeam.name}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/match/${match.matchID}`}
                  className="text-[#38003C] hover:underline flex items-center"
                >
                  Quick View
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}