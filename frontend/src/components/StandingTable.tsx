import { Standing } from "@/types/standing";


interface GoalTableProps {
  standings: Standing[];
  onEdit: (standing: Standing) => void;
  onDelete: (id: string) => void;
}

export default function StandingTable({ standings, onEdit, onDelete }: GoalTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="border border-gray-300 px-4 py-2 text-left">Result ID</th> */}
            <th className="border border-gray-300 p-2">Team</th>
            <th className="border border-gray-300 p-2">Played</th>
            <th className="border border-gray-300 p-2">Won</th>
            <th className="border border-gray-300 p-2">Draw</th>
            <th className="border border-gray-300 p-2">Lost</th>
            <th className="border border-gray-300 p-2">Goals For</th>
            <th className="border border-gray-300 p-2">Goals Against</th>
            <th className="border border-gray-300 p-2">Goal Difference</th>
            <th className="border border-gray-300 p-2">Points</th>
            <th className="border border-gray-300 p-2">Form</th>
            <th className="border border-gray-300 p-2">Tournament</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
            {standings.map((standing) => (
              <tr key={standing.standingID}>
              {/* <td className="border border-gray-300 px-4 py-2">{result.resultID}</td> */}
              <td className="border border-gray-300 p-2">{standing.team.name}</td>
              <td className="border border-gray-300 p-2">{standing.played}</td>
              <td className="border border-gray-300 p-2">{standing.won}</td>
              <td className="border border-gray-300 p-2">{standing.draw}</td>
              <td className="border border-gray-300 p-2">{standing.lost}</td>
              <td className="border border-gray-300 p-2">{standing.goalsFor}</td>
              <td className="border border-gray-300 p-2">{standing.goalsAgainst}</td>
              <td className="border border-gray-300 p-2">{standing.goalDifference}</td>
              <td className="border border-gray-300 p-2">{standing.points}</td>
              <td className="border border-gray-300 p-2">{standing.form || "N/A"}</td>
              <td className="border border-gray-300 p-2">{standing.tournament.name}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onEdit(standing)} className="text-blue-600 mr-2">
                  ✏️
                </button>
                <button onClick={() => onDelete(standing.standingID)} className="text-red-600">
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