"use client";

import TournamentCard from "@/components/TournamentCard";
import { Tournament } from "@/types/tournament";
import api from "@/utils/api";
import { useEffect, useState } from "react";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await api.get("/tournaments");
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };
    fetchTournaments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Tournaments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.tournamentID} tournament={tournament} />
        ))}
      </div>
    </div>
  );
}