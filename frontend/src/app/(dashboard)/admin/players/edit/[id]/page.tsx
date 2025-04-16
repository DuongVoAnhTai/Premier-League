"use client";

import { getAllPlayers, getTeams, updatePlayer } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditPlayerPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    position: "GOALKEEPER",
    birthDate: "",
    nationality: "",
    image: "",
    teamID: "",
  });

  // Lấy dữ liệu cầu thủ để chỉnh sửa
  const { data: players = [], isLoading: playersLoading, error: playersError  } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getAllPlayers,
  });

  // Lấy danh sách đội bóng và vị trí
  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  useEffect(() => {
    if (players.length > 0) {
      const player = players.find((p: any) => p.playerID === id);
      if (player) {
        setFormData({
          name: player.name,
          position: player.position,
          birthDate: player.birthDate.split("T")[0],
          nationality: player.nationality,
          image: player.image || "",
          teamID: player.teamID,
        });
      }
    }
  }, [players, id]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updatePlayer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPlayers"] });
      router.push("/admin/players");
    },
    onError: (error) => {
      console.error("Error updating player:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: id as string, data: formData });
  };

  if (playersLoading || teamsLoading) return <div>Loading...</div>;
  if (playersError) return <div>Error: {playersError.message}</div>;
  if (!players.find((p: any) => p.playerID === id)) return <div>Player not found</div>;
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Player</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Player Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Position</label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="GOALKEEPER">Goalkeeper</option>
            <option value="DEFENDER">Defender</option>
            <option value="MIDFIELDER">Midfielder</option>
            <option value="FORWARD">Forward</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Birth Date</label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nationality</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Nationality"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Team</label>
          <select
            value={formData.teamID}
            onChange={(e) => setFormData({ ...formData, teamID: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
            disabled={teamsLoading}
          >
            <option value="">Select Team</option>
            {teams.map((team: any) => (
              <option key={team.teamID} value={team.teamID}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/players")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}