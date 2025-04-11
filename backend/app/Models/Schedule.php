<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $primaryKey = 'scheduleID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['scheduleID', 'creationDate', 'location', 'tournamentID'];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class, 'tournamentID', 'tournamentID');
    }

    public function matches()
    {
        return $this->hasMany(MatchModel::class, 'scheduleID', 'scheduleID');
    }

    // public function results()
    // {
    //     return $this->hasMany(Result::class, 'scheduleID', 'scheduleID');
    // }
}
