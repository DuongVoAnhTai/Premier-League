import { Team } from "./team";

export interface Tournament {
    tournamentID: string;
    name: string;
    startDate: string;
    endDate?: string | null;
    teams?: Team[];
    // schedules?: Schedule[];
}