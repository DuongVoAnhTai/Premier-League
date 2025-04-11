<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['roleID' => 'role1', 'name' => 'admin']);
        Role::create(['roleID' => 'role2', 'name' => 'user']);
    }
}
