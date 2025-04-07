<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MatchModel extends Model
{
    protected $primaryKey = 'matchID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['matchID', 'team1ID', 'team2ID', 'matchDate', 'status', 'scheduleID'];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'scheduleID', 'scheduleID');
    }

    public function team1()
    {
        return $this->belongsTo(Team::class, 'team1ID', 'teamID');
    }

    public function team2()
    {
        return $this->belongsTo(Team::class, 'team2ID', 'teamID');
    }

    public function result()
    {
        return $this->hasOne(Result::class, 'matchID', 'matchID');
    }
}
