"use client";

import MatchTable from "@/components/MatchTable";
import { getAllMatches } from "@/lib/api";
import { Match } from "@/types/match";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export default function MatchesPage() {
  const router = useRouter();

  // Lấy danh sách trận đấu
  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ["allMatches"],
    queryFn: getAllMatches,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {/* Nút Add Match */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/matches/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Match
        </button>
      </div>

      {/* Bảng danh sách trận đấu */}
      <MatchTable
        matches={matches}
        onEdit={(match: Match) => router.push(`/admin/matches/edit/${match.matchID}`)}
        onDelete={(id: string) => router.push(`/admin/matches/delete/${id}`)}
      />
    </div>
  );
}