<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $primaryKey = 'playerID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['playerID', 'name', 'position', 'birthDate', 'nationality', 'image', 'teamID'];

    public function team()
    {
        return $this->belongsTo(Team::class, 'teamID', 'teamID');
    }

    public function goals()
    {
        return $this->hasMany(Goal::class, 'scoredBy', 'playerID');
    }

    public function getGoals()
    {
        return $this->goals;
    }
}
