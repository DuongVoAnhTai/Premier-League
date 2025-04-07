<?php

namespace Database\Seeders;

use App\Models\Tournament;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TournamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tournament::create([
            'tournamentID' => Str::uuid(),
            'name' => 'National Championship 2025',
            'startDate' => '2025-05-01',
            'endDate' => '2025-06-01',
        ]);
    }
}
