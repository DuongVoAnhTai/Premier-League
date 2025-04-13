import { Tournament } from "@/types/tournament";
import Link from "next/link";

interface TournamentCardProps {
    tournament: Tournament;
  }
  
  const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold">{tournament.name}</h2>
        <p>Start: {new Date(tournament.startDate).toLocaleDateString()}</p>
        <p>End: {tournament.endDate ? new Date(tournament.endDate).toLocaleDateString() : "TBD"}</p>
        <Link href={`/tournaments/${tournament.tournamentID}`} className="text-blue-500 hover:underline">
          View Details
        </Link>
      </div>
    );
  };
  
  export default TournamentCard;