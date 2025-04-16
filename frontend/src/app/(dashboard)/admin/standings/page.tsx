"use client";

import StandingTable from "@/components/StandingTable";
import { getStandings } from "@/lib/api";
import { Standing } from "@/types/standing";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function GoalPage() {
  const router = useRouter();

   // Lấy danh sách standing
   const { data: standings = [], isLoading, error } = useQuery({
    queryKey: ["allStandings"],
    queryFn: getStandings,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {/* Add Goal Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/standings/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Ranking
        </button>
      </div>

      {/* Results Table */}
      <StandingTable
        standings={standings}
        onEdit={(standing: Standing) => router.push(`/admin/standings/edit/${standing.standingID}`)}
        onDelete={(id: string) => router.push(`/admin/standings/delete/${id}`)}
      />
    </div>
  );
}