import { Match } from "@/types/match";

interface MatchTableProps {
  matches: Match[];
  onEdit: (match: Match) => void;
  onDelete: (id: string) => void;
}

export default function MatchTable({ matches, onEdit, onDelete }: MatchTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Match Date</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Home Team</th>
            <th className="border border-gray-300 p-2">Away Team</th>
            <th className="border border-gray-300 p-2">Score</th>
            <th className="border border-gray-300 p-2">Tournament</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.matchID}>
              <td className="border border-gray-300 p-2">{match.matchDate}</td>
              <td className="border border-gray-300 p-2">{match.time}</td>
              <td className="border border-gray-300 p-2">{match.status}</td>
              <td className="border border-gray-300 p-2">{match.home_team?.name || "N/A"}</td>
              <td className="border border-gray-300 p-2">{match.away_team?.name || "N/A"}</td>
              <td className="border border-gray-300 p-2">
              {match.homeScore} - {match.awayScore}
              </td>
              <td className="border border-gray-300 p-2">{match.tournament.name}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onEdit(match)} className="text-blue-600 mr-2">
                  ✏️
                </button>
                <button onClick={() => onDelete(match.matchID)} className="text-red-600">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}