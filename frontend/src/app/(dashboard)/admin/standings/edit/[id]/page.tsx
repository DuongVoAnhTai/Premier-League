"use client";

import { getStandings, getTeams, getTournaments, updateStanding } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStandingPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    played: 0,
    won: 0,
    draw: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    form: "",
    teamID: "",
    tournamentID: "",
  });

  // Lấy dữ liệu standing, teams, và tournaments
  const { data: standings = [], isLoading: standingsLoading, error: standingsError } = useQuery({
    queryKey: ["allStandings"],
    queryFn: getStandings,
  });

  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ["allTeams"],
    queryFn: getTeams,
  });

  const { data: tournaments = [], isLoading: tournamentsLoading } = useQuery({
    queryKey: ["allTournaments"],
    queryFn: getTournaments,
  });

  useEffect(() => {
    if (standings.length > 0) {
      const standing = standings.find((s: any) => s.standingID === id);
      if (standing) {
        setFormData({
          played: standing.played,
          won: standing.won,
          draw: standing.draw,
          lost: standing.lost,
          goalsFor: standing.goalsFor,
          goalsAgainst: standing.goalsAgainst,
          goalDifference: standing.goalDifference,
          points: standing.points,
          form: standing.form || "",
          teamID: standing.teamID,
          tournamentID: standing.tournamentID,
        });
      }
    }
  }, [standings, id]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateStanding(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStandings"] });
      router.push("/admin/standings");
    },
    onError: (error) => {
      console.error("Error updating standing:", error);
      alert("Error updating standing: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      id: id as string,
      data: {
        ...formData,
        played: Number(formData.played),
        won: Number(formData.won),
        draw: Number(formData.draw),
        lost: Number(formData.lost),
        goalsFor: Number(formData.goalsFor),
        goalsAgainst: Number(formData.goalsAgainst),
        goalDifference: Number(formData.goalDifference),
        points: Number(formData.points),
      },
    });
  };

  if (standingsLoading || teamsLoading || tournamentsLoading) return <div>Loading...</div>;
  if (standingsError) return <div>Error: {standingsError.message}</div>;
  if (!standings.find((s: any) => s.standingID === id)) return <div>Standing not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Standing</h2>
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
          <label className="block text-sm font-medium mb-1">Goal Difference</label>
          <input
            type="number"
            value={formData.goalDifference}
            onChange={(e) => setFormData({ ...formData, goalDifference: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Points</label>
          <input
            type="number"
            value={formData.points}
            onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded p-2"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Form (optional)</label>
          <input
            type="text"
            value={formData.form}
            onChange={(e) => setFormData({ ...formData, form: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="e.g., W-D-L"
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
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}