"use client";

import { deleteStanding, getStandings } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteStandingPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [standing, setStanding] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Lấy dữ liệu standing
  const { data: standings = [], isLoading, error } = useQuery({
    queryKey: ["allStandings"],
    queryFn: getStandings,
  });

  useEffect(() => {
    if (standings.length > 0) {
      const foundStanding = standings.find((s: any) => s.standingID === id);
      setStanding(foundStanding);
    }
  }, [standings, id]);

  const deleteMutation = useMutation({
    mutationFn: deleteStanding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStandings"] });
      router.push("/admin/standings");
    },
    onError: (error) => {
      console.error("Error deleting standing:", error);
      alert("Error deleting standing: " + error.message);
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
  if (!standing) return <div>Standing not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete Standing</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this standing?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {standing.standingID}</p>
        <p><strong>Played:</strong> {standing.played}</p>
        <p><strong>Won:</strong> {standing.won}</p>
        <p><strong>Draw:</strong> {standing.draw}</p>
        <p><strong>Lost:</strong> {standing.lost}</p>
        <p><strong>Goals For:</strong> {standing.goalsFor}</p>
        <p><strong>Goals Against:</strong> {standing.goalsAgainst}</p>
        <p><strong>Goal Difference:</strong> {standing.goalDifference}</p>
        <p><strong>Points:</strong> {standing.points}</p>
        <p><strong>Form:</strong> {standing.form || "N/A"}</p>
        <p><strong>Team ID:</strong> {standing.teamID}</p>
        <p><strong>Tournament ID:</strong> {standing.tournamentID}</p>
      </div>
      {isConfirming && (
        <p className="text-red-600 mb-4">Please confirm again to delete this standing.</p>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/standings")}
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