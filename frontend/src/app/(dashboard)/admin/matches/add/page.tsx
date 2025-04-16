"use client";

import { createMatch, getTeams, getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddMatchPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    matchDate: "",
    time: "",
    status: "LIVE",
    homeScore: 0,
    awayScore: 0,
    tournamentID: "",
    homeTeamID: "",
    awayTeamID: "",
  });

  // Lấy danh sách tournament và team để chọn
  const { data: tournaments = [], isLoading: tournamentsLoading } = useQuery({
    queryKey: ["allTournaments"],
    queryFn: getTournaments,
  });

  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ["allTeams"],
    queryFn: getTeams,
  });

  const createMutation = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMatches"] });
      router.push("/admin/matches");
    },
    onError: (error) => {
      console.error("Error creating match:", error);
      alert("Error creating match: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...formData,
      homeScore: Number(formData.homeScore),
      awayScore: Number(formData.awayScore),
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Match</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Match Date</label>
          <input
            type="date"
            value={formData.matchDate}
            onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="LIVE">Live</option>
            <option value="FINISHED">Finished</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Home Score</label>
          <input
            type="number"
            value={formData.homeScore}
            onChange={(e) => setFormData({ ...formData, homeScore: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Away Score</label>
          <input
            type="number"
            value={formData.awayScore}
            onChange={(e) => setFormData({ ...formData, awayScore: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Home Team</label>
          <select
            value={formData.homeTeamID}
            onChange={(e) => setFormData({ ...formData, homeTeamID: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
            disabled={teamsLoading}
          >
            <option value="">Select Home Team</option>
            {teams.map((team: any) => (
              <option key={team.teamID} value={team.teamID}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Away Team</label>
          <select
            value={formData.awayTeamID}
            onChange={(e) => setFormData({ ...formData, awayTeamID: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
            disabled={teamsLoading}
          >
            <option value="">Select Away Team</option>
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
            onClick={() => router.push("/admin/matches")}
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