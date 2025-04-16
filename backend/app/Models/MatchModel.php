<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchModel extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $primaryKey = 'matchID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['matchID', 'matchDate', 'time', 'status', 'homeScore', 'awayScore', 'tournamentID', 'homeTeamID', 'awayTeamID'];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournamentID', 'tournamentID');
    }

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'homeTeamID', 'teamID');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'awayTeamID', 'teamID');
    }

    public function goals()
    {
        return $this->hasMany(Goal::class, 'matchID', 'matchID');
    }

    public function updateAfterMatch()
    {
        // $this->homeScore = $this->goals->where('ownGoal', false)->whereIn('scoredBy', $this->homeTeam->players->pluck('playerID'))->count();
        // $this->awayScore = $this->goals->where('ownGoal', false)->whereIn('scoredBy', $this->awayTeam->players->pluck('playerID'))->count();
        // $this->status = 'FINISHED';
        // $this->save();

        $this->tournament->generateStanding();
    }

    public function calculateGoalDifference()
    {
        return $this->homeScore - $this->awayScore;
    }

    public function calculatePoints()
    {
        if ($this->homeScore > $this->awayScore) {
            return ['home' => 3, 'away' => 0];
        } elseif ($this->homeScore < $this->awayScore) {
            return ['home' => 0, 'away' => 3];
        } else {
            return ['home' => 1, 'away' => 1];
        }
    }

    public function getTeam()
    {
        return [$this->homeTeam, $this->awayTeam];
    }

    public function getStanding()
    {
        return $this->tournament->standings->whereIn('teamID', [$this->homeTeamID, $this->awayTeamID]);
    }
}
