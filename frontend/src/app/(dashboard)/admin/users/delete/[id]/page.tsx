"use client";

import { deleteUser, getUsers } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteUserPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Lấy dữ liệu user
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((u: any) => u.userID === id);
      setUser(foundUser);
    }
  }, [users, id]);

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      router.push("/admin/users");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      alert("Error deleting user: " + error.message);
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
  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delete User</h2>
      <p className="mb-4 text-red-600">Are you sure you want to delete this user?</p>
      <div className="mb-4">
        <p><strong>ID:</strong> {user.userID}</p>
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