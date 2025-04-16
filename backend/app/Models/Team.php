<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $primaryKey = 'teamID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['teamID', 'name', 'coach', 'city', 'country', 'logo', 'tournamentID'];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournamentID', 'tournamentID');
    }

    public function players()
    {
        return $this->hasMany(Player::class, 'teamID', 'teamID');
    }

    public function homeMatches()
    {
        return $this->hasMany(MatchModel::class, 'homeTeamID', 'teamID');
    }

    public function awayMatches()
    {
        return $this->hasMany(MatchModel::class, 'awayTeamID', 'teamID');
    }

    public function standings()
    {
        return $this->hasMany(Standing::class, 'teamID', 'teamID');
    }

    public function addPlayer(Player $player)
    {
        $player->teamID = $this->teamID;
        $player->save();
        return $player;
    }

    public function removePlayer(Player $player)
    {
        if ($player->teamID === $this->teamID) {
            $player->teamID = null;
            $player->save();
        }
    }
}
