'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getCoachMatches, getCoachSchedules } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function CoachMatchesPage({ params }: { params: { tournamentID: string } }) {
    const { data: schedules, isLoading: schedulesLoading } = useQuery({
        queryKey: ['coachSchedules', params.tournamentID],
        queryFn: () => getCoachSchedules(params.tournamentID),
    });

    if (schedulesLoading) return <div>Loading...</div>;

    return (
        <ProtectedRoute role="coach">
        <div>
            <h1 className="text-2xl font-bold mb-4">Matches</h1>
            {schedules?.map((schedule: any) => (
            <div key={schedule.scheduleID} className="mb-6">
                <h2 className="text-xl font-semibold">Schedule: {schedule.creationDate}</h2>
                <MatchesList scheduleID={schedule.scheduleID} />
            </div>
            ))}
        </div>
        </ProtectedRoute>
    );
    }

    const MatchesList = ({ scheduleID }: { scheduleID: string }) => {
    //useQuery: Hook to fetch data from API and state management
    const { data: matches, isLoading } = useQuery({
        queryKey: ['coachMatches', scheduleID],
        queryFn: () => getCoachMatches(scheduleID),
    });

    if (isLoading) return <div>Loading matches...</div>;

    return (
        <div className="mt-4">
            {matches?.map((match: any) => (
                <div key={match.matchID} className="border p-4 mb-2">
                    <p>{match.team1?.name} vs {match.team2?.name}</p>
                    <p>Date: {match.matchDate}</p>
                    <p>Status: {match.status}</p>
                    {match.result && (
                        <p>Result: {match.result.scoreTeam1} - {match.result.scoreTeam2}</p>
                    )}
                </div>
            ))}
        </div>
    );
};