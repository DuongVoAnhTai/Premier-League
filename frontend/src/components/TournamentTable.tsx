import { Tournament } from "@/types/tournament";

interface TournamentTableProps {
  tournaments: Tournament[];
  onEdit: (tournament: Tournament) => void;
  onDelete: (id: string) => void;
  completion: (id: string) => void;
}

export default function TournamentTable({ tournaments, onEdit, onDelete, completion }: TournamentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament.tournamentID}>
              <td className="border border-gray-300 px-4 py-2">{tournament.tournamentID}</td>
              <td className="border border-gray-300 px-4 py-2">{tournament.name}</td>
              <td className="border border-gray-300 px-4 py-2">{tournament.startDate}</td>
              <td className="border border-gray-300 px-4 py-2">{tournament.endDate || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => onEdit(tournament)} className="text-blue-600 mr-2">
                  ✏️
                </button>
                <button onClick={() => onDelete(tournament.tournamentID)} className="text-red-600 mr-2">
                  🗑️
                </button>
                <button onClick={() => completion(tournament.tournamentID)} className="text-green-600">
                  🔍
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}