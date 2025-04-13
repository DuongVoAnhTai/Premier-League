"use client";

import { Tournament } from "@/types/tournament";
import api from "@/utils/api";
import { useEffect, useState } from "react";

export default function AdminTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [formData, setFormData] = useState({ tournamentID: "", name: "", startDate: "", endDate: "" });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tournaments", formData);
      setFormData({ tournamentID: "", name: "", startDate: "", endDate: "" });
      const response = await api.get("/tournaments");
      setTournaments(response.data);
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Tournaments</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Tournament ID"
          value={formData.tournamentID}
          onChange={(e) => setFormData({ ...formData, tournamentID: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Create Tournament
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <div key={tournament.tournamentID} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">{tournament.name}</h2>
            <p>Start: {new Date(tournament.startDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}