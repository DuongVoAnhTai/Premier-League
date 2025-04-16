<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $primaryKey = 'goalID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['goalID', 'minute', 'ownGoal', 'isPenalty', 'matchID', 'scoredBy'];

    public function match()
    {
        return $this->belongsTo(MatchModel::class, 'matchID', 'matchID');
    }

    public function player()
    {
        return $this->belongsTo(Player::class, 'scoredBy', 'playerID');
    }

    public function saveResult()
    {
        $this->save();
        $this->match->updateAfterMatch();
    }

    public function getScore()
    {
        return $this->ownGoal ? -1 : 1;
    }
}
