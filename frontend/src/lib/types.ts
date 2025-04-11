export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'coach';
}

export interface Tournament {
    tournamentID: string;
    name: string;
    startDate: string;
    endDate: string;
}

export interface Team {
    teamID: string;
    name: string;
    coach: string;
    points: number;
    tournamentID: string;
}

export interface Schedule {
    scheduleID: string;
    creationDate: string;
    tournamentID: string;
    matches?: Match[];
}

export interface Match {
    matchID: string;
    team1ID: string;
    team2ID: string;
    matchDate: string;
    status: string;
    scheduleID: string;
    team1?: Team;
    team2?: Team;
    result?: Result;
}

export interface Ranking {
    rankingID: string;
    teamID: string;
    points: number;
    rank: number;
    tournamentID: string;
    team?: Team;
}

export interface Result {
    resultID: string;
    matchID: string;
    scoreTeam1: number;
    scoreTeam2: number;
}
