'use client';

import { MatchForm } from "@/components/MatchForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function MatchesPage({ params }: { params: { tournamentID: string } }) {
    //useQuery: Hook to fetch data from API and state management
    const queryClient = useQueryClient();
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

    const tournament = tournaments?.find((t: any) => t.tournamentID === params.tournamentID);

    if (!tournament) return <div>Tournament not found</div>;

    return (
        <ProtectedRoute role="admin">
            <div>
                <h1 className="text-2xl font-bold mb-4">Manage Matches for {tournament.name}</h1>
                {tournament.schedules?.map((schedule: any) => (
                <div key={schedule.scheduleID} className="mb-6">
                    <h2 className="text-xl font-semibold">Schedule: {schedule.creationDate}</h2>
                    <MatchForm
                        scheduleID={schedule.scheduleID}
                        teams={tournament.teams}
                        onSuccess={() => mutation.mutate()}
                    />
                    <div className="mt-4">
                        {schedule.matches?.map((match: any) => (
                            <div key={match.matchID} className="border p-4 mb-2">
                                <p>{match.team1?.name} vs {match.team2?.name}</p>
                                <p>Date: {match.matchDate}</p>
                                <p>Status: {match.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
                ))}
            </div>
        </ProtectedRoute>
    );
}