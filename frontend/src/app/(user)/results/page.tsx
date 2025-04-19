"use client";

import { getAllMatches } from "@/lib/api";
import { Match } from "@/types/match";
import { useQuery } from "@tanstack/react-query";

export default function ResultsPage() {
  // Fetch matches
  const { data: matches = [], isLoading } = useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: getAllMatches,
  });

  // Filter for finished matches
  const finishedMatches = matches.filter(
    (match) => match.status === "FINISHED"
  );

  // Group matches by date
  const groupedMatches = finishedMatches.reduce((acc, match) => {
    const date = match.matchDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedMatches).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center mb-8">
          Premier League 2024/25 Match Results
        </h1>

        {/* Match Results */}
        {sortedDates.length === 0 ? (
          <div className="text-center text-gray-500">No results found.</div>
        ) : (
          sortedDates.map((date) => (
            <div key={date} className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {formatDate(date)}
              </h2>
              <div className="space-y-4">
                {groupedMatches[date].map((match) => (
                  <div
                    key={match.matchID}
                    className="bg-white border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span>{match.home_team.name}</span>
                      </div>
                      <div className="bg-[#38003C] text-white px-4 py-1 rounded">
                        {match.homeScore}-{match.awayScore}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{match.away_team.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}