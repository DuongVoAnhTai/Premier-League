<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Standing extends Model
{
    use HasFactory;

    protected $primaryKey = 'standingID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['standingID', 'played', 'won', 'draw', 'lost', 'goalsFor', 'goalsAgainst', 'goalDifference', 'points', 'form', 'teamID', 'tournamentID'];

    public function team()
    {
        return $this->belongsTo(Team::class, 'teamID', 'teamID');
    }

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournamentID', 'tournamentID');
    }
}
