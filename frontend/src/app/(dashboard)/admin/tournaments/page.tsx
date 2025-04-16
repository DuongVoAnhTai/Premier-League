"use client";

import TournamentTable from "@/components/TournamentTable";
import { getTournaments } from "@/lib/api";
import { Tournament } from "@/types/tournament";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";



export default function TournamentsPage() {
  const router = useRouter();

  // Lấy danh sách giải đấu
  const { data: tournaments = [], isLoading, error } = useQuery({
    queryKey: ["allTournaments"],
    queryFn: getTournaments,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {/* Nút Add Tournament */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/tournaments/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Tournament
        </button>
      </div>

      {/* Bảng danh sách giải đấu */}
      <TournamentTable
        tournaments={tournaments}
        onEdit={(tournament: Tournament) => router.push(`/admin/tournaments/edit/${tournament.tournamentID}`)}
        onDelete={(id: string) => router.push(`/admin/tournaments/delete/${id}`)}
      />
    </div>
  );
}