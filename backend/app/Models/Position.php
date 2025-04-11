<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $primaryKey = 'positionID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['positionID', 'name'];

    public function players() {
        return $this->hasMany(Player::class, 'positionID', 'positionID');
    }
}
