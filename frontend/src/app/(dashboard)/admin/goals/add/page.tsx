"use client";

import { createGoal, getAllMatches, getAllPlayers } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddGoalPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    minute: 0,
    ownGoal: false,
    isPenalty: false,
    matchID: "",
    scoredBy: "",
  });

  // Lấy danh sách match và player để chọn
  const { data: matches = [], isLoading: matchesLoading } = useQuery({
    queryKey: ["allMatches"],
    queryFn: getAllMatches,
  });

  const { data: players = [], isLoading: playersLoading } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getAllPlayers,
  });

  const createMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allResults"] });
      router.push("/admin/goals");
    },
    onError: (error) => {
      console.error("Error creating result:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...formData,
      minute: Number(formData.minute),
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Minute</label>
          <input
            type="number"
            value={formData.minute}
            onChange={(e) => setFormData({ ...formData, minute: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            max="120"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Own Goal</label>
          <input
            type="checkbox"
            checked={formData.ownGoal}
            onChange={(e) => setFormData({ ...formData, ownGoal: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Penalty</label>
          <input
            type="checkbox"
            checked={formData.isPenalty}
            onChange={(e) => setFormData({ ...formData, isPenalty: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Match</label>
          <select
            value={formData.matchID}
            onChange={(e) => setFormData({ ...formData, matchID: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
            disabled={matchesLoading}
          >
            <option value="">Select Match</option>
            {matches.map((match: any) => (
              <option key={match.matchID} value={match.matchID}>
                {match.matchDate} - {match.homeTeamID} vs {match.awayTeamID}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Scored By</label>
          <select
            value={formData.scoredBy}
            onChange={(e) => setFormData({ ...formData, scoredBy: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
            disabled={playersLoading}
          >
            <option value="">Select Player</option>
            {players.map((player: any) => (
              <option key={player.playerID} value={player.playerID}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/goals")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}