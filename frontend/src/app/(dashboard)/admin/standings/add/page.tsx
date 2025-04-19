"use client";

import { createStanding, getTeams, getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddStandingPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    played: 0,
    won: 0,
    draw: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    teamID: "",
    tournamentID: "",
  });

  // Lấy danh sách team và tournament để chọn
  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ["allTeams"],
    queryFn: getTeams,
  });

  const { data: tournaments = [], isLoading: tournamentsLoading } = useQuery({
    queryKey: ["allTournaments"],
    queryFn: getTournaments,
  });

  const createMutation = useMutation({
    mutationFn: createStanding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStandings"] });
      router.push("/admin/standings");
    },
    onError: (error) => {
      console.error("Error creating standing:", error);
      alert("Error creating standing: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...formData,
      played: Number(formData.played),
      won: Number(formData.won),
      draw: Number(formData.draw),
      lost: Number(formData.lost),
      goalsFor: Number(formData.goalsFor),
      goalsAgainst: Number(formData.goalsAgainst),
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Standing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Played</label>
          <input
            type="number"
            value={formData.played}
            onChange={(e) => setFormData({ ...formData, played: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Won</label>
          <input
            type="number"
            value={formData.won}
            onChange={(e) => setFormData({ ...formData, won: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Draw</label>
          <input
            type="number"
            value={formData.draw}
            onChange={(e) => setFormData({ ...formData, draw: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Lost</label>
          <input
            type="number"
            value={formData.lost}
            onChange={(e) => setFormData({ ...formData, lost: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Goals For</label>
          <input
            type="number"
            value={formData.goalsFor}
            onChange={(e) => setFormData({ ...formData, goalsFor: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Goals Against</label>
          <input
            type="number"
            value={formData.goalsAgainst}
            onChange={(e) => setFormData({ ...formData, goalsAgainst: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tournament</label>
          <select
            value={formData.tournamentID}
            onChange={(e) => setFormData({ ...formData, tournamentID: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
            disabled={tournamentsLoading}
          >
            <option value="">Select Tournament</option>
            {tournaments.map((tournament: any) => (
              <option key={tournament.tournamentID} value={tournament.tournamentID}>
                {tournament.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/standings")}
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