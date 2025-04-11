<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $primaryKey = 'roleID';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['roleID', 'name'];

    public function accounts() {
        return $this->hasMany(User::class, 'roleID', 'roleID');
    }
}
