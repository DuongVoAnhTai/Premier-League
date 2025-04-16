import { Tournament } from "./tournament";

export interface Team {
  teamID: string;
  name: string;
  coach: string;
  city: string;
  country: string;
  logo: string | null;
  tournamentID: string;
  tournament: Tournament;
}