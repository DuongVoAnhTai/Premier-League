import { Goal } from "@/types/goal";


interface GoalTableProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export default function GoalTable({ goals, onEdit, onDelete }: GoalTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="border border-gray-300 px-4 py-2 text-left">Result ID</th> */}
            <th className="border border-gray-300 p-2">Minute</th>
            <th className="border border-gray-300 p-2">Own Goal</th>
            <th className="border border-gray-300 p-2">Penalty</th>
            <th className="border border-gray-300 p-2">Match</th>
            <th className="border border-gray-300 p-2">Scored By</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
            {goals.map((goal) => (
              <tr key={goal.goalID}>
              {/* <td className="border border-gray-300 px-4 py-2">{result.resultID}</td> */}
              <td className="border border-gray-300 p-2">{goal.minute}</td>
              <td className="border border-gray-300 p-2">{goal.ownGoal ? "Yes" : "No"}</td>
              <td className="border border-gray-300 p-2">{goal.isPenalty ? "Yes" : "No"}</td>
              <td className="border border-gray-300 p-2">{goal.match
                                    ? `${goal.match.home_team?.name || "N/A"} vs ${goal.match.away_team?.name || "N/A"} (${goal.match.matchDate} ${goal.match.time})`
                                    : "N/A"}</td>
              <td className="border border-gray-300 p-2">{goal.player.name}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onEdit(goal)} className="text-blue-600 mr-2">
                  ✏️
                </button>
                <button onClick={() => onDelete(goal.goalID)} className="text-red-600">
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