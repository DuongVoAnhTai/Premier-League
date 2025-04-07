<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ranking extends Model
{
    protected $primaryKey = 'rankingID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['rankingID', 'teamID', 'points', 'rank', 'tournamentID'];

    public function team()
    {
        return $this->belongsTo(Team::class, 'teamID', 'teamID');
    }

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournamentID', 'tournamentID');
    }
}
