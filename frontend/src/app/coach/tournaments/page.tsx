'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getTournaments } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function CoachTournamentsPage() {
    //useQuery: Hook to fetch data from API and state management
    const { data: tournaments, isLoading } = useQuery({
        queryKey: ['tournaments'],
        queryFn: getTournaments,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <ProtectedRoute role="coach">
        <div>
            <h1 className="text-2xl font-bold mb-4">Tournaments</h1>
            <div className="space-y-4">
                {tournaments?.map((tournament: any) => (
                    <div key={tournament.tournamentID} className="border p-4">
                        <Link href={`/coach/tournaments/${tournament.tournamentID}`} className="text-blue-500 hover:underline">
                            {tournament.name}
                        </Link>
                        <p>Start: {tournament.startDate}</p>
                        <p>End: {tournament.endDate}</p>
                    </div>
                ))}
            </div>
        </div>
        </ProtectedRoute>
    );
}