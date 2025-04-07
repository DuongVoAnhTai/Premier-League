<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $primaryKey = 'resultID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['resultID', 'matchID', 'scoreTeam1', 'scoreTeam2'];

    public function match()
    {
        return $this->belongsTo(MatchModel::class, 'matchID', 'matchID');
    }
}
