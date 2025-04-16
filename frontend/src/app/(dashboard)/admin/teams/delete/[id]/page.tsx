"use client";

import { deleteTeam, getAllTeams } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteTeamPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Lấy dữ liệu đội bóng
  const { data: teams = [], isLoading, error } = useQuery({
    queryKey: ["allTeams"],
    queryFn: getAllTeams,
  });

  useEffect(() => {
    if (teams.length > 0) {
      const foundTeam = teams.find((t: any) => t.teamID === id);
      setTeam(foundTeam);
    }
  }, [teams, id]);

  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTeams"] });
      router.push("/admin/teams");
    },
    onError: (error) => {
      console.error("Error deleting team:", error);
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
  if (!team) return <div>Team not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete Team</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this team?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {team.teamID}</p>
        <p><strong>Name:</strong> {team.name}</p>
        <p><strong>Coach:</strong> {team.coach}</p>
        <p><strong>City:</strong> {team.city}</p>
        <p><strong>Country:</strong> {team.country}</p>
        <p><strong>Tournament:</strong> {team.tournament.name}</p>
        <p><strong>Logo:</strong> {team.logo || "N/A"}</p>
      </div>
      {isConfirming && (
        <p className="text-red-600 mb-4">Please confirm again to delete this team.</p>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/teams")}
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