"use client";

import GoalTable from "@/components/GoalTable";
import { getAllGoals } from "@/lib/api";
import { Goal } from "@/types/goal";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function GoalPage() {
  const router = useRouter();

  // Fetch results
  const { data: goals = [], isLoading, error } = useQuery({
    queryKey: ["allGoals"],
    queryFn: getAllGoals,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {/* Add Goal Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/goals/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Result
        </button>
      </div>

      {/* Results Table */}
      <GoalTable
        goals={goals}
        onEdit={(goal: Goal) => router.push(`/admin/goals/edit/${goal.goalID}`)}
        onDelete={(id: string) => router.push(`/admin/goals/delete/${id}`)}
      />
    </div>
  );
}