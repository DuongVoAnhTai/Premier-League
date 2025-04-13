'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getCoachSchedules } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function CoachSchedulesPage({ params }: { params: { tournamentID: string } }) {
    //useQuery: Hook to fetch data from API and state management
    const { data: schedules, isLoading } = useQuery({
        queryKey: ['coachSchedules', params.tournamentID],
        queryFn: () => getCoachSchedules(params.tournamentID),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <ProtectedRoute role="coach">
            <div>
                <h1 className="text-2xl font-bold mb-4">Schedules</h1>
                <div className="space-y-4">
                    {schedules?.map((schedule: any) => (
                        <div key={schedule.scheduleID} className="border p-4">
                        <p>Created: {schedule.creationDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
}