'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TeamForm } from "@/components/TeamForm";
import { getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function TeamsPage({ params }: { params: { tournamentID: string } }) {
    //useQueryClient: Hook from React Query to refresh cache when data change
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
            <h1 className="text-2xl font-bold mb-4">Manage Teams for {tournament.name}</h1>
            <TeamForm tournamentID={params.tournamentID} onSuccess={() => mutation.mutate()} />
            <div className="mt-6">
                {tournament.teams?.map((team: any) => (
                    <div key={team.teamID} className="border p-4 mb-2">
                        <p>Name: {team.name}</p>
                        <p>Coach: {team.coach}</p>
                        <p>Points: {team.points}</p>
                    </div>
                ))}
            </div>
        </div>
        </ProtectedRoute>
    );
}