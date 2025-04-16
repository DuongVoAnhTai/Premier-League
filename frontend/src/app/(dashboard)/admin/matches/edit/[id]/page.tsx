"use client";

import { getAllMatches, getTeams, getTournaments, updateMatch } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function EditMatchPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
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

  // Lấy dữ liệu trận đấu để chỉnh sửa
  const { data: matches = [], isLoading: matchesLoading } = useQuery({
    queryKey: ["allMatches"],
    queryFn: getAllMatches,
  });

  // Lấy danh sách đội bóng và lịch thi đấu
  const { data: teams = [], isLoading: teamsLoading, error: matchesError } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const { data: tournaments = [], isLoading: tournamentsLoading } = useQuery({
    queryKey: ["allTournaments"],
    queryFn: getTournaments,
  });

  useEffect(() => {
    if (matches.length > 0) {
      const match = matches.find((m: any) => m.matchID === id);
      if (match) {
        setFormData({
          matchDate: match.matchDate.split("T")[0],
          time: match.time,
          status: match.status,
          homeScore: match.homeScore,
          awayScore: match.awayScore,
          tournamentID: match.tournamentID,
          homeTeamID: match.homeTeamID,
          awayTeamID: match.awayTeamID,
        });
      }
    }
  }, [matches, id]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateMatch(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMatches"] });
      router.push("/admin/matches");
    },
    onError: (error) => {
      console.error("Error updating match:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: id as string, data: {
      ...formData,
      homeScore: Number(formData.homeScore),
      awayScore: Number(formData.awayScore),
    } });
  };

  if (matchesLoading || tournamentsLoading || teamsLoading) return <div>Loading...</div>;
  if (matchesError) return <div>Error: {matchesError.message}</div>;
  if (!matches.find((m: any) => m.matchID === id)) return <div>Match not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Match</h2>
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
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}