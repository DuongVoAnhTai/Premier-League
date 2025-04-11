'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getTournaments } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CoachTournamentDetailsPage({ params }: { params: { tournamentID: string } }) {
  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: getTournaments,
  });

  if (isLoading) return <div>Loading...</div>;

  const tournament = tournaments?.find((t: any) => t.tournamentID === params.tournamentID);

  if (!tournament) return <div>Tournament not found</div>;

  return (
    <ProtectedRoute role="coach">
        <div>
            <h1 className="text-2xl font-bold mb-4">{tournament.name}</h1>
            <div className="space-y-4">
                <Link href={`/coach/tournaments/${tournament.tournamentID}/schedules`} className="block bg-blue-500 text-white p-2 rounded">
                    View Schedules
                </Link>
                <Link href={`/coach/tournaments/${tournament.tournamentID}/matches`} className="block bg-blue-500 text-white p-2 rounded">
                    View Matches
                </Link>
                <Link href={`/coach/tournaments/${tournament.tournamentID}/rankings`} className="block bg-blue-500 text-white p-2 rounded">
                    View Rankings
                </Link>
            </div>
        </div>
    </ProtectedRoute>
  );
}