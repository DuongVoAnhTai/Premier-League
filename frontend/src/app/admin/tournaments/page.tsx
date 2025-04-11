'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TournamentForm } from "@/components/TournamentForm";
import { getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function TournamentsPage() {
    //useQueryClient: Hook from React Query to refresh cache when data change
    const queryClient = useQueryClient();
    
    //useQuery: Hook to fetch data from API and state management
    const { data: tournaments, isLoading } = useQuery({
        queryKey: ['tournaments'],
        queryFn: getTournaments,
    });

    //useMutation: Hook to action change data (add, edit, delete)
    const mutation = useMutation({
        mutationFn: () => getTournaments(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tournaments'] });
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <ProtectedRoute role="admin">
            <div>
                <h1 className="text-2xl font-bold mb-4">Tournaments</h1>
                <TournamentForm onSuccess={() => mutation.mutate()} />
                <div className="mt-6">
                    {tournaments?.map((tournament: any) => (
                        <div key={tournament.tournamentID} className="border p-4 mb-2">
                            <Link href={`/admin/tournaments/${tournament.tournamentID}`} className="text-blue-500 hover:underline">
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