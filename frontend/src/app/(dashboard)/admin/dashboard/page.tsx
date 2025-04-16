"use client";

import BarChart from "@/components/BarChart"
import PieChartComponent from "@/components/PieChart"
import UserCard from "@/components/UserCard"
import { getPlayerAgeDistribution, getTeamDistribution, getUserCards } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage () {
  const {
    data: userCardData,
    isLoading: userCardLoading,
    error: userCardError,
  } = useQuery({
    queryKey: ["userCardData"],
    queryFn: getUserCards,
    initialData: {
      total_tournament: 0,
      active_team: 0,
      scheduled_matches: 0,
      total_player: 0,
    },
  });

  const {
    data: teamDistribution,
    isLoading: teamDistributionLoading,
    error: teamDistributionError,
  } = useQuery({
    queryKey: ["teamDistribution"],
    queryFn: getTeamDistribution,
    initialData: [],
  });

  const {
    data: playerAgeDistribution,
    isLoading: playerAgeDistributionLoading,
    error: playerAgeDistributionError,
  } = useQuery({
    queryKey: ["playerAgeDistribution"],
    queryFn: getPlayerAgeDistribution,
    initialData: [],
  });

  if (userCardLoading || teamDistributionLoading || playerAgeDistributionLoading) {
    return <div>Loading...</div>;
  }

  if (userCardError || teamDistributionError || playerAgeDistributionError) {
    return (
      <div>
        Error loading data: {userCardError?.message || teamDistributionError?.message || playerAgeDistributionError?.message}
      </div>
    );
  }

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="total tournament" value= {userCardData.total_tournament}/>
          <UserCard type="active team" value= {userCardData.active_team}/>
          <UserCard type="scheduled matches" value= {userCardData.scheduled_matches}/>
          <UserCard type="total player" value= {userCardData.total_player}/>
        </div>
        {/* CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* PIE CHARTS */}
          <div className="w-full lg:w-1/2 h-[700px]">
            <PieChartComponent data={teamDistribution}/>
          </div>
            {/* BAR CHARTS */}
          <div className="w-full lg:w-1/2 h-[600px]">
            <BarChart data={playerAgeDistribution}/>
          </div>
        </div>
      </div>
    </div>
  )
}




