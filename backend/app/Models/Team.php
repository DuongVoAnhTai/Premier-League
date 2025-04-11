<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $primaryKey = 'teamID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['teamID', 'name', 'coach', 'points', 'logo', 'tournamentID'];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournamentID', 'tournamentID');
    }

    public function players() {
        return $this->hasMany(Player::class, 'teamID', 'teamID');
    }

    public function rankings()
    {
        return $this->hasMany(Ranking::class, 'teamID', 'teamID');
    }
}
