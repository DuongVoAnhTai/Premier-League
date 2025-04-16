import { Team } from "./team";
import { Tournament } from "./tournament";

export interface Standing {
    standingID: string;
    played: number;
    won: number;
    draw: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
    form: string | null;
    teamID: string;
    tournamentID: string;
    team: Team;
    tournament: Tournament
  }