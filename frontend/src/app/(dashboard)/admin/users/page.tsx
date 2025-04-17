"use client";

import UserTable from "@/components/UserTable";
import { getUsers } from "@/lib/api";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";



export default function TournamentsPage() {
  const router = useRouter();

  // Lấy danh sách user
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      {/* Nút Add Tournament */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/users/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      {/* Bảng danh sách giải đấu */}
      <UserTable
        users={users}
        onEdit={(user: User) => router.push(`/admin/users/edit/${user.id}`)}
        onDelete={(id: number) => router.push(`/admin/users/delete/${id}`)}
      />
    </div>
  );
}