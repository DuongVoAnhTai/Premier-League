import Image from "next/image";
import { Team } from "@/types/team";

interface TeamTableProps {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (id: string) => void;
}

export default function TeamTable({ teams, onEdit, onDelete }: TeamTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Coach</th>
            <th className="border border-gray-300 p-2">City</th>
            <th className="border border-gray-300 p-2">Country</th>
            <th className="border border-gray-300 p-2">Tournament</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.teamID}>
              <td className="border border-gray-300 p-2">{team.name}</td>
              <td className="border border-gray-300 p-2">{team.coach}</td>
              <td className="border border-gray-300 p-2">{team.city}</td>
              <td className="border border-gray-300 p-2">{team.country}</td>
              <td className="border border-gray-300 p-2">{team.tournament?.name || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onEdit(team)} className="text-blue-600 mr-2">
                  ✏️
                </button>
                <button onClick={() => onDelete(team.teamID)} className="text-red-600">
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