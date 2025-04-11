<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $primaryKey = 'playerID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['playerID', 'name', 'teamID', 'positionID'];

    public function team() {
        return $this->belongsTo(Team::class, 'teamID', 'teamID');
    }

    public function position() {
        return $this->belongsTo(Position::class, 'positionID', 'positionID');
    }
}
