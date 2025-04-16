"use client";

import { deleteMatch, getAllMatches } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteMatchPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [match, setMatch] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Lấy dữ liệu match
  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ["allMatches"],
    queryFn: getAllMatches,
  });

  useEffect(() => {
    if (matches.length > 0) {
      const foundMatch = matches.find((m: any) => m.matchID === id);
      setMatch(foundMatch);
    }
  }, [matches, id]);

  const deleteMutation = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMatches"] });
      router.push("/admin/matches");
    },
    onError: (error) => {
      console.error("Error deleting match:", error);
      alert("Error deleting match: " + error.message);
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
  if (!match) return <div>Match not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete Match</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this match?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {match.matchID}</p>
        <p><strong>Match Date:</strong> {match.matchDate}</p>
        <p><strong>Time:</strong> {match.time}</p>
        <p><strong>Status:</strong> {match.status}</p>
        <p><strong>Home Team:</strong> {match.home_team.name}</p>
        <p><strong>Away Team:</strong> {match.away_team.name}</p>
        <p><strong>Score:</strong> {match.homeScore} - {match.awayScore}</p>
        <p><strong>Tournament:</strong> {match.tournament.name}</p>
      </div>
      {isConfirming && (
        <p className="text-red-600 mb-4">Please confirm again to delete this match.</p>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/matches")}
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