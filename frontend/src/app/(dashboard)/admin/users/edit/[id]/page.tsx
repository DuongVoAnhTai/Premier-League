"use client";

import { getUsers, updateUser } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "ADMIN",
  });

  const { data: users = [], isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (users.length > 0) {
      const user = users.find((u: any) => u.id === Number(id));
      if (user) {
        setFormData({
          email: shapeEmail(user.email),
          name: user.name,
          role: user.role,
        });
      }
    }
  }, [users, id]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      router.push("/admin/users");
    },
    onError: (error: any) => {
      console.error("Error updating user:", error);
      alert("Error updating user: " + (error.response?.data?.message || error.message));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = Number(id);
    if (isNaN(userId)) {
      // setError("Invalid user ID");
      return;
    }
    updateMutation.mutate({ id: userId, data: formData });
  };

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) return <div>Error: {usersError.message}</div>;
  if (!users.find((u: any) => u.id === Number(id))) return <div>User not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="User Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="ADMIN">Admin</option>
            <option value="REFEREE">Referee</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

const shapeEmail = (email: string) => {
  return email.trim().toLowerCase();
};