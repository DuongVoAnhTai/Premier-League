"use client";

import { createTeam, getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AddTeamPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    coach: "",
    city: "",
    country: "",
    logo: "",
    tournamentID: "",
  });
  // Lấy danh sách tournament để chọn
  const { data: tournaments = [], isLoading: tournamentsLoading } = useQuery({
    queryKey: ["allTournaments"],
    queryFn: getTournaments,
  });

  const createMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTeams"] });
      router.push("/admin/teams");
    },
    onError: (error) => {
      console.error("Error creating team:", error);
      alert("Error creating team: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Team Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Coach</label>
          <input
            type="text"
            value={formData.coach}
            onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Coach Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="City"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Country"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Logo URL (optional)</label>
          <input
            type="text"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Logo URL"
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
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/teams")}
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