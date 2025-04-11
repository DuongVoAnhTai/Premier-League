'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getTournaments } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function TournamentDetailsPage({ params }: { params: { tournamentID: string } }) {
    //useQuery: Hook to fetch data from API and state management
    const { data: tournaments, isLoading } = useQuery({
      queryKey: ['tournaments'],
      queryFn: getTournaments,
    });

    if (isLoading) return <div>Loading...</div>;

    const tournament = tournaments?.find((t: any) => t.tournamentID === params.tournamentID);

    if (!tournament) return <div>Tournament not found</div>;

    return (
        <ProtectedRoute role="admin">
            <div>
                <h1 className="text-2xl font-bold mb-4">{tournament.name}</h1>
                <div className="space-y-4">
                <Link href={`/admin/tournaments/${tournament.tournamentID}/teams`} className="block bg-blue-500 text-white p-2 rounded">
                    Manage Teams
                </Link>
                <Link href={`/admin/tournaments/${tournament.tournamentID}/schedules`} className="block bg-blue-500 text-white p-2 rounded">
                    Manage Schedules
                </Link>
                <Link href={`/admin/tournaments/${tournament.tournamentID}/matches`} className="block bg-blue-500 text-white p-2 rounded">
                    Manage Matches
                </Link>
                <Link href={`/admin/tournaments/${tournament.tournamentID}/rankings`} className="block bg-blue-500 text-white p-2 rounded">
                    View Rankings
                </Link>
                </div>
            </div>
        </ProtectedRoute>
      );
}