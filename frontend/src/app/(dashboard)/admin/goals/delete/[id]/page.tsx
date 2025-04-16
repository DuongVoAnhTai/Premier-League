"use client";

import { deleteGoal, getAllGoals } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteGoalPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [goal, setGoal] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Lấy dữ liệu goal
  const { data: goals = [], isLoading, error } = useQuery({
    queryKey: ["allGoals"],
    queryFn: getAllGoals,
  });

  useEffect(() => {
    if (goals.length > 0) {
      const foundGoal = goals.find((g: any) => g.goalID === id);
      setGoal(foundGoal);
    }
  }, [goals, id]);

  const deleteMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allGoals"] });
      router.push("/admin/goals");
    },
    onError: (error) => {
      console.error("Error deleting goal:", error);
      alert("Error deleting goal: " + error.message);
    },
  });

  const handleDelete = () => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      deleteMutation.mutate(id as string);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!goal) return <div>Goal not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete Goal</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this goal?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {goal.goalID}</p>
        <p><strong>Minute:</strong> {goal.minute}</p>
        <p><strong>Own Goal:</strong> {goal.ownGoal ? "Yes" : "No"}</p>
        <p><strong>Penalty:</strong> {goal.isPenalty ? "Yes" : "No"}</p>
        <p><strong>Match ID:</strong> {goal.matchID}</p>
        <p><strong>Scored By:</strong> {goal.scoredBy}</p>
      </div>
      {isConfirming && (
        <p className="text-red-600 mb-4">Please confirm again to delete this goal.</p>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/goals")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={deleteMutation.isPending}
        >
          {isConfirming ? "Confirm Delete" : "Delete"}
        </button>
      </div>
    </div>
  );
}