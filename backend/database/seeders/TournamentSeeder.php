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
            'tournamentID' => 'tournament1',
            'name' => 'National Championship 2025',
            'startDate' => '2025-04-01',
            'endDate' => '2025-06-1',
            'status' => 'upcoming'
        ]);
    }
}
