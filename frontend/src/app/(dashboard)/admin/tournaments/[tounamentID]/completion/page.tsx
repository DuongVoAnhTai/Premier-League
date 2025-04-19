"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getTournamentCompletion } from "@/lib/api";

export default function TournamentCompletionPage() {
  const { tournamentID } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tournamentCompletion", tournamentID],
    queryFn: () => getTournamentCompletion(tournamentID as string),
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {(error as Error).message}</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{data.tournamentName} - Completion Status</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="mb-2"><strong>Teams:</strong> {data.teamCount}</p>
        <p className="mb-2"><strong>Matches per Team:</strong> {data.requiredMatchesPerTeam}</p>
        <p className="mb-2"><strong>Total Matches:</strong> {data.totalMatchesInTournament}</p>
        <p className="mb-4">
          <strong>Status:</strong>{" "}
          {data.isTournamentComplete ? (
            <span className="text-green-600">Completed</span>
          ) : (
            <span className="text-red-600">Ongoing</span>
          )}
        </p>

        <h3 className="text-lg font-semibold mb-2">Team Progress</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Team</th>
              <th className="border p-2 text-left">Matches Played</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.teams.map((team: any) => (
              <tr key={team.teamID}>
                <td className="border p-2">{team.teamName}</td>
                <td className="border p-2">{team.matchesPlayed} / {team.matchesRequired}</td>
                <td className="border p-2">
                  {team.isComplete ? (
                    <span className="text-green-600">Complete</span>
                  ) : (
                    <span className="text-red-600">Incomplete</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => router.back()}
        className="mt-4 bg-gray-300 px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
}