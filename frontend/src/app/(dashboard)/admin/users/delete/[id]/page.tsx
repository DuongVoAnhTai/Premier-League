"use client";

import { deleteUser, getUsers } from "@/lib/api";
import { User } from "@/types/user"; // Sử dụng interface User
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteUserPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams(); // id là string từ useParams
  const [isConfirming, setIsConfirming] = useState(false);

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });

  const user = users.find((u: User) => u.id === Number(id));

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id), // Sử dụng id: number
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      router.push("/admin/users");
    },
    onError: (error: any) => {
      console.error("Error deleting user:", error);
      alert("Error deleting user: " + (error.response?.data?.message || error.message));
    },
  });

  const handleDelete = () => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      const userId = Number(id);
      if (isNaN(userId)) {
        alert("Invalid user ID");
        return;
      }
      deleteMutation.mutate(userId);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete User</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this user?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      {isConfirming && (
        <p className="text-red-600 mb-4">Please confirm again to delete this user.</p>
      )}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => router.push("/admin/users")}
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