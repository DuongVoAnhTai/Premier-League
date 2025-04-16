"use client";

import PlayerTable from "@/components/PlayerTable";
import { getAllPlayers } from "@/lib/api";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";



export default function PlayersPage() {
  const router = useRouter();

  // Lấy danh sách cầu thủ
  const { data: players = [], isLoading, error } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getAllPlayers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {/* Nút Add Player */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/players/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Player
        </button>
      </div>

      {/* Bảng danh sách cầu thủ */}
      <PlayerTable
        players={players}
        onEdit={(player: Player) => router.push(`/admin/players/edit/${player.playerID}`)}
        onDelete={(id: string) => router.push(`/admin/players/delete/${id}`)}
      />
    </div>
  );
}