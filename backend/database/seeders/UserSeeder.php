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
        $users = [
            [
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'name' => 'Admin User',
                'role' => 'ADMIN',
            ],
            [
                'email' => 'referee@example.com',
                'password' => Hash::make('password'),
                'name' => 'Referee User',
                'role' => 'REFEREE',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
