<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournament = Tournament::first();
        Team::create([
            'teamID' => Str::uuid(),
            'name' => 'Team A',
            'coach' => 'Coach A',
            'points' => 0,
            'tournamentID' => $tournament->tournamentID,
        ]);

        Team::create([
            'teamID' => Str::uuid(),
            'name' => 'Team B',
            'coach' => 'Coach B',
            'points' => 0,
            'tournamentID' => $tournament->tournamentID,
        ]);
    }
}
