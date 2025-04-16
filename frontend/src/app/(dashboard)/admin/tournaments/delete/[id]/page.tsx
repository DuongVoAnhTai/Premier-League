"use client";

import { deleteTournament, getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function DeleteTournamentPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [tournament, setTournament] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Lấy dữ liệu giải đấu
  const { data: tournaments = [], isLoading, error } = useQuery({
    queryKey: ["allTournaments"],
    queryFn: getTournaments,
  });

  useEffect(() => {
    if (tournaments.length > 0) {
      const foundTournament = tournaments.find((t: any) => t.tournamentID === id);
      setTournament(foundTournament);
    }
  }, [tournaments, id]);

  const deleteMutation = useMutation({
    mutationFn: deleteTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTournaments"] });
      router.push("/admin/tournaments");
    },
    onError: (error) => {
      console.error("Error deleting tournament:", error);
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
  if (!tournament) return <div>Tournament not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete Tournament</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this tournament?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {tournament.tournamentID}</p>
        <p><strong>Name:</strong> {tournament.name}</p>
        <p><strong>Start Date:</strong> {tournament.startDate}</p>
        <p><strong>End Date:</strong> {tournament.endDate || "N/A"}</p>
      </div>
      {isConfirming && (
        <p className="text-red-600 mb-4">Please confirm again to delete this tournament.</p>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/tournaments")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          {isConfirming ? "Confirm Delete" : "Delete"}
        </button>
      </div>
    </div>
  );
}