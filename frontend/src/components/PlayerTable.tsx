import { Player } from "@/types/player";

interface PlayerTableProps {
  players: Player[];
  onEdit: (player: Player) => void;
  onDelete: (id: string) => void;
}

export default function PlayerTable({ players, onEdit, onDelete }: PlayerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="border border-gray-300 px-4 py-2 text-left">ID</th> */}
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Position</th>
            <th className="border border-gray-300 p-2">Birth Date</th>
            <th className="border border-gray-300 p-2">Nationality</th>
            <th className="border border-gray-300 p-2">Team</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.playerID}>
              {/* <td className="border border-gray-300 px-4 py-2">{player.playerID}</td> */}
              <td className="border border-gray-300 p-2">{player.name}</td>
              <td className="border border-gray-300 p-2">{player.position}</td>
              <td className="border border-gray-300 p-2">{player.birthDate}</td>
              <td className="border border-gray-300 p-2">{player.nationality}</td>
              <td className="border border-gray-300 p-2">{player.team?.name || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => onEdit(player)} className="text-blue-600 mr-2">
                  ✏️
                </button>
                <button onClick={() => onDelete(player.playerID)} className="text-red-600">
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