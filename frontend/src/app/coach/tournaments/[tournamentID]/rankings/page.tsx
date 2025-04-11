'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getCoachRankings } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function CoachRankingsPage({ params }: { params: { tournamentID: string } }) {
    //useQuery: Hook to fetch data from API and state management
    const { data: rankings, isLoading } = useQuery({
        queryKey: ['coachRankings', params.tournamentID],
        queryFn: () => getCoachRankings(params.tournamentID),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <ProtectedRoute role="coach">
            <div>
                <h1 className="text-2xl font-bold mb-4">Rankings</h1>
                <div className="space-y-4">
                    {rankings?.map((ranking: any) => (
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