'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { approveSchedule, generateSchedule, getTournaments } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function SchedulesPage({ params }: { params: { tournamentID: string } }) {
    //useQueryClient: Hook from React Query to refresh cache when data change
    const queryClient = useQueryClient();

    //useQuery: Hook to fetch data from API and state management
    const { data: tournaments, isLoading } = useQuery({
        queryKey: ['tournaments'],
        queryFn: getTournaments,
    });

    //useMutation: Hook to action change data (add, edit, delete)
    const generateMutation = useMutation({
        mutationFn: (tournamentID: string) => generateSchedule(tournamentID),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tournaments'] });
        },
    });

    const approveMutation = useMutation({
        mutationFn: (scheduleID: string) => approveSchedule(scheduleID),
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
            <h1 className="text-2xl font-bold mb-4">Manage Schedules for {tournament.name}</h1>
            <button
            onClick={() => generateMutation.mutate(params.tournamentID)}
            className="bg-blue-500 text-white p-2 rounded mb-4">
                Generate Schedule
            </button>
            <div className="space-y-4">
                {tournament.schedules?.map((schedule: any) => (
                    <div key={schedule.scheduleID} className="border p-4">
                        <p>Created: {schedule.creationDate}</p>
                        <button
                            onClick={() => approveMutation.mutate(schedule.scheduleID)}
                            className="bg-green-500 text-white p-2 rounded mt-2">
                            Approve Schedule
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </ProtectedRoute>
    );
}