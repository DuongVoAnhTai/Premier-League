<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@example.com',
        //     'password' => Hash::make('password'),
        //     'role' => 'admin',
        // ]);

        // User::create([
        //     'name' => 'Coach User',
        //     'email' => 'coach@example.com',
        //     'password' => Hash::make('password'),
        //     'role' => 'coach',
        // ]);

        User::create([
            'username' => 'admin',
            'displayname' => 'Admin User',
            'password' => Hash::make('password'),
            'roleID' => 'role1',
        ]);

        User::create([
            'username' => 'user',
            'displayname' => 'Regular User',
            'password' => Hash::make('password'),
            'roleID' => 'role2',
        ]);
    }
}
