<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;

    protected $primaryKey = 'tournamentID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['tournamentID', 'name', 'startDate', 'endDate', 'status'];

    public function teams()
    {
        return $this->hasMany(Team::class, 'tournamentID', 'tournamentID');
    }

    public function matches()
    {
        return $this->hasMany(MatchModel::class, 'tournamentID', 'tournamentID');
    }

    public function standings()
    {
        return $this->hasMany(Standing::class, 'tournamentID', 'tournamentID');
    }

    public function generateStanding()
    {
        $teams = $this->teams;
        foreach ($teams as $team) {
            $standing = Standing::firstOrNew(['teamID' => $team->teamID, 'tournamentID' => $this->tournamentID]);
            $matches = $team->homeMatches->merge($team->awayMatches)->where('tournamentID', $this->tournamentID);

            $standing->played = $matches->count();
            $standing->won = $matches->filter(function ($match) use ($team) {
                return ($match->homeTeamID === $team->teamID && $match->homeScore > $match->awayScore) ||
                       ($match->awayTeamID === $team->teamID && $match->awayScore > $match->homeScore);
            })->count();
            $standing->draw = $matches->filter(function ($match) {
                return $match->homeScore === $match->awayScore;
            })->count();
            $standing->lost = $matches->filter(function ($match) use ($team) {
                return ($match->homeTeamID === $team->teamID && $match->homeScore < $match->awayScore) ||
                       ($match->awayTeamID === $team->teamID && $match->awayScore < $match->homeScore);
            })->count();
            $standing->goalsFor = $matches->sum(function ($match) use ($team) {
                return $match->homeTeamID === $team->teamID ? $match->homeScore : $match->awayScore;
            });
            $standing->goalsAgainst = $matches->sum(function ($match) use ($team) {
                return $match->homeTeamID === $team->teamID ? $match->awayScore : $match->homeScore;
            });
            $standing->goalDifference = $standing->goalsFor - $standing->goalsAgainst;
            $standing->points = ($standing->won * 3) + $standing->draw;
            $standing->form = $matches->sortByDesc('matchDate')->take(2)->map(function ($match) use ($team) {
                if ($match->homeScore === $match->awayScore) return 'D';
                if ($match->homeTeamID === $team->teamID) return $match->homeScore > $match->awayScore ? 'W' : 'L';
                return $match->awayScore > $match->homeScore ? 'W' : 'L';
            })->implode('');

            $standing->save();
        }

        return $this->standings;
    }
}
