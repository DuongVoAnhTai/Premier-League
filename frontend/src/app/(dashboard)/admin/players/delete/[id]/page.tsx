"use client";

import { deletePlayer, getAllPlayers } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function DeletePlayerPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [player, setPlayer] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Lấy dữ liệu cầu thủ
  const { data: players = [], isLoading, error } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getAllPlayers,
  });

  useEffect(() => {
    if (players.length > 0) {
      const foundPlayer = players.find((p: any) => p.playerID === id);
      setPlayer(foundPlayer);
    }
  }, [players, id]);

  const deleteMutation = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPlayers"] });
      router.push("/admin/players");
    },
    onError: (error) => {
      console.error("Error deleting player:", error);
    },
  });

  const handleDelete = () => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      deleteMutation.mutate(id as string);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!player) return <div>Player not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete Player</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this player?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {player.playerID}</p>
        <p><strong>Name:</strong> {player.name}</p>
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Birth Date:</strong> {player.birthDate}</p>
        <p><strong>Nationality:</strong> {player.nationality}</p>
        <p><strong>Team:</strong> {player.team.name}</p>
        <p><strong>Image:</strong> {player.image || "N/A"}</p>
      </div>
      {isConfirming && (
        <p className="text-red-600 mb-4">Please confirm again to delete this player.</p>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/players")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={deleteMutation.isPending}
        >
          {isConfirming ? "Confirm Delete" : "Delete"}
        </button>
      </div>
    </div>
  );
}