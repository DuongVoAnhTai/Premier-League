"use client";

import TeamTable from "@/components/TeamTable";
import { getAllTeams } from "@/lib/api";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export default function TeamsPage() {
  const router = useRouter();

  // Lấy danh sách đội bóng
  const { data: teams = [], isLoading, error } = useQuery({
    queryKey: ["allTeams"],
    queryFn: getAllTeams,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {/* Nút Add Team */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/teams/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Team
        </button>
      </div>

      {/* Bảng danh sách đội bóng */}
      <TeamTable
        teams={teams}
        onEdit={(team: Team) => router.push(`/admin/teams/edit/${team.teamID}`)}
        onDelete={(id: string) => router.push(`/admin/teams/delete/${id}`)}
      />
    </div>
  );
}