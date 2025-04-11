'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getTournaments, updateRanking } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function RankingsPage({ params }: { params: { tournamentID: string } }) {
    //useQueryClient: Hook from React Query to refresh cache when data change
    const queryClient = useQueryClient();
    
    //useQuery: Hook to fetch data from API and state management
    const { data: tournaments, isLoading } = useQuery({
        queryKey: ['tournaments'],
        queryFn: getTournaments,
    });

    //useMutation: Hook to action change data (add, edit, delete)
    const mutation = useMutation({
        mutationFn: (tournamentID: string) => updateRanking(tournamentID),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tournaments'] });
        },
    });

    if (isLoading) return <div>Loading...</div>;

    const tournament = tournaments?.find((t: any) => t.tournamentID === params.tournamentID);

    if (!tournament) return <div>Tournament not found</div>;

    return (
        <ProtectedRoute role="admin">
        <div>
            <h1 className="text-2xl font-bold mb-4">Rankings for {tournament.name}</h1>
            <button
            onClick={() => mutation.mutate(params.tournamentID)}
            className="bg-blue-500 text-white p-2 rounded mb-4">
                Update Rankings
            </button>
            <div className="space-y-4">
                {tournament.rankings?.map((ranking: any) => (
                    <div key={ranking.rankingID} className="border p-4">
                        <p>Team: {ranking.team?.name}</p>
                        <p>Points: {ranking.points}</p>
                        <p>Rank: {ranking.rank}</p>
                    </div>
                ))}
            </div>
        </div>
        </ProtectedRoute>
    );
}