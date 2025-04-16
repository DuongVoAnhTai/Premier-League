<?php

namespace Database\Seeders;

use App\Models\MatchModel;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournaments = Tournament::all();
        $teams = Team::all()->pluck('teamID')->toArray();

        foreach ($tournaments as $tournament) {
            // Create 5 matches per tournament
            for ($i = 0; $i < 5; $i++) {
                $homeTeamID = fake()->randomElement($teams);
                $awayTeamID = fake()->randomElement(array_diff($teams, [$homeTeamID]));

                MatchModel::create([
                    'matchID' => fake()->uuid(),
                    'matchDate' => fake()->dateTimeBetween('2025-01-01', '2025-12-31'),
                    'time' => fake()->time('H:i'),
                    'status' => fake()->randomElement(['LIVE', 'FINISHED', 'CANCELLED']),
                    'homeScore' => fake()->numberBetween(0, 5),
                    'awayScore' => fake()->numberBetween(0, 5),
                    'tournamentID' => $tournament->tournamentID,
                    'homeTeamID' => $homeTeamID,
                    'awayTeamID' => $awayTeamID,
                ]);
            }
        }
    }
}
