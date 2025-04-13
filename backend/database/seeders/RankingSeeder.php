<?php

namespace Database\Seeders;

use App\Models\Ranking;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RankingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournament = Tournament::first();
        $teams = Team::all()->sortByDesc('points');

        $rank = 1;
        foreach ($teams as $team) {
            Ranking::create([
                'rankingID' => fake()->uuid(),
                'tournamentID' => $tournament->tournamentID,
                'teamID' => $team->teamID,
                'points' => $team->points,
                'rank' => $rank++,
            ]);
        }
    }
}
