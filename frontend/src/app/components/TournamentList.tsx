"use client";
import { useEffect, useState } from "react";
import { Tournament } from "../types/tournament";

const TournamentList: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments`);
        const data = await response.json();
        console.log("API response:", data);
        setTournaments(data.data as Tournament[]);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách giải đấu</h1>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id} className="p-2 border-b">
            {tournament.name} ({tournament.start_date} - {tournament.end_date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentList;