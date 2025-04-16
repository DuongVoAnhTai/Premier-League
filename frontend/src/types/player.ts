import { Team } from "./team";

export interface Player {
  playerID: string;
  name: string;
  position: "GOALKEEPER" | "DEFENDER" | "MIDFIELDER" | "FORWARD";
  birthDate: string;
  nationality: string;
  image: string | null;
  teamID: string;
  team: Team;
}