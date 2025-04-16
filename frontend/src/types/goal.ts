import { Match } from "./match";
import { Player } from "./player";

export interface Goal {
    goalID: string;
    minute: number;
    ownGoal: boolean;
    isPenalty: boolean;
    matchID: string;
    scoredBy: string;
    match: Match
    player: Player
}