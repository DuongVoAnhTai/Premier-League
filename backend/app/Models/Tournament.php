<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    protected $primaryKey = 'tournamentID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'tournamentID', 
        'name', 
        'startDate', 
        'endDate',
        'status'
    ];

    public function teams()
    {
        return $this->hasMany(Team::class, 'tournamentID', 'tournamentID');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'tournamentID', 'tournamentID');
    }

    public function rankings()
    {
        return $this->hasMany(Ranking::class, 'tournamentID', 'tournamentID');
    }
}
