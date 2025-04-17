"use client";

import { getCurrentUser, updateUserProfile } from "@/lib/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the User type based on your backend schema
interface User {
  id?: number;
  name: string;
  email: string;
  role: "ADMIN" | "REFEREE";
}

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      setSuccess("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "" }));
      router.push("/admin/dashboard");
      setError(null);
      // Dispatch event to notify Navbar to refetch user data
      window.dispatchEvent(new Event("profileUpdated"));
    },
    onError: (error: any) => {
      setError(error.message || "Failed to update profile");
      setSuccess(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (!formData.name) {
      setError("Name cannot be empty");
      return;
    }
    setError(null);
    updateProfileMutation.mutate({
      name: formData.name,
      password: formData.password || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Profile</h2>
        {userLoading ? (
          <div>Loading...</div>
        ) : userError || !user ? (
          <div>Error loading user data</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded p-2">
                <span className="text-gray-500 mr-2">👤</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent outline-none"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center border border-gray-300 rounded p-2">
                <span className="text-gray-500 mr-2">📧</span>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full bg-gray-100 outline-none cursor-not-allowed"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center border border-gray-300 rounded p-2">
                <span className="text-gray-500 mr-2">🔒</span>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent outline-none"
                  placeholder="New Password (optional)"
                />
              </div>
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-green-500 text-sm text-center">
                {success}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}