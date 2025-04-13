<?php

namespace Database\Seeders;

use App\Models\MatchModel;
use App\Models\Result;
use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matches = MatchModel::all();

        foreach ($matches as $match) {
            $score1 = fake()->numberBetween(0, 5);
            $score2 = fake()->numberBetween(0, 5);

            Result::create([
                'resultID' => fake()->uuid(),
                'matchID' => $match->matchID,
                'scoreTeam1' => $score1,
                'scoreTeam2' => $score2,
            ]);

            // Cập nhật điểm cho đội
            $team1 = Team::find($match->team1ID);
            $team2 = Team::find($match->team2ID);

            if ($score1 > $score2) {
                $team1->points += 3;
            } elseif ($score1 < $score2) {
                $team2->points += 3;
            } else {
                $team1->points += 1;
                $team2->points += 1;
            }

            $team1->save();
            $team2->save();
        }
    }
}
