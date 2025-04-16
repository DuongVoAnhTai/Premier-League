<?php

namespace Database\Seeders;

use App\Models\Ranking;
use App\Models\Standing;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StandingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = Team::all();
        $tournaments = Tournament::all();

        foreach ($tournaments as $tournament) {
            foreach ($teams as $team) {
                Standing::create([
                    'standingID' => fake()->uuid(),
                    'played' => fake()->numberBetween(0, 10),
                    'won' => fake()->numberBetween(0, 5),
                    'draw' => fake()->numberBetween(0, 3),
                    'lost' => fake()->numberBetween(0, 5),
                    'goalsFor' => fake()->numberBetween(0, 20),
                    'goalsAgainst' => fake()->numberBetween(0, 20),
                    'goalDifference' => fake()->numberBetween(-10, 10),
                    'points' => fake()->numberBetween(0, 15),
                    'form' => fake()->randomElement(['W', 'D', 'L']) . fake()->randomElement(['W', 'D', 'L']),
                    'teamID' => $team->teamID,
                    'tournamentID' => $tournament->tournamentID,
                ]);
            }
        }
    }
}
