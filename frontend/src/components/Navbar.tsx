"use client";

import { getCurrentUser, getTournamentsNav } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar () {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: tournaments = [],
    isLoading: tournamentsLoading,
    error: tournamentsError,
  } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getTournamentsNav,
  });

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    const handleProfileUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, [queryClient]);

  const currentTournament = tournaments.find((t: any) => t.isCurrent) || tournaments[0];
  const handleUserClick = () => {
    router.push("/admin/profile");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
      {/* DROPDOWN */}
      <div className="hidden md:flex flex items-center gap-2">
        {tournamentsLoading ? (
          <span>Loading...</span>
        ) : tournamentsError ? (
          <span>Error loading tournaments</span>
        ) : (
          <select 
            className="bg-blue-100 text-blue-800 font-semibold rounded p-2"
            value={currentTournament?.id || ""}
            onChange={(e) => {
              const selectedTournament = tournaments.find((t: any) => t.id === e.target.value);
              console.log("Selected tournament:", selectedTournament);
            }}
          >
            {tournaments.map((tournament: any) => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.name} {tournament.isCurrent ? "(current)" : ""}
              </option>
            ))}
          </select>

        )}
        {tournaments.map((tournament: any) => (
          <h1 className="bg-blue-100 text-blue-800 font-semibold rounded p-2" key={tournament.id}>
            {tournament.status}
          </h1>
        ))}
      </div>
      {/* ICONS AND USERS */}
      <div
        className="flex items-center gap-2 justify-end w-full cursor-pointer"
        onClick={handleUserClick}
      >
        <div className="flex">
          {userLoading ? (
            <span>Loading...</span>
          ) : userError || !user ? (
            <span>Admin</span>
          ) : (
            <span className="text-[16px] leading-3 font-medium">{user.name}</span>
          )}
        </div>
        <Image src="/avatar.png" alt="" width={35} height={35} className="cursor-pointer" />
      </div>
    </div>
  )
}