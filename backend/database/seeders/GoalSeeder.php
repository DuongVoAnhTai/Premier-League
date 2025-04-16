<?php

namespace Database\Seeders;

use App\Models\MatchModel;
use App\Models\Player;
use App\Models\Goal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $matches = MatchModel::all();
        $players = Player::all()->pluck('playerID')->toArray();

        foreach ($matches as $match) {
            // Create 0-3 goals per match
            $numGoals = fake()->numberBetween(0, 3);
            for ($i = 0; $i < $numGoals; $i++) {
                Goal::create([
                    'goalID' => fake()->uuid(),
                    'minute' => fake()->numberBetween(1, 90),
                    'ownGoal' => fake()->boolean(10), // 10% chance of own goal
                    'isPenalty' => fake()->boolean(20), // 20% chance of penalty
                    'matchID' => $match->matchID,
                    'scoredBy' => fake()->randomElement($players),
                ]);
            }
        }
    }
}
