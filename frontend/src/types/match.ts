import { Team } from "./team";
import { Tournament } from "./tournament";

export interface Match {
  matchID: string;
  matchDate: string;
  time: string;
  status: "LIVE" | "FINISHED" | "CANCELLED";
  homeScore: number;
  awayScore: number;
  tournamentID: string;
  homeTeamID: string;
  awayTeamID: string;
  tournament: Tournament
  home_team: Team;
  away_team: Team;
}