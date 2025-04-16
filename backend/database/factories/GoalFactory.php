<?php

namespace Database\Factories;

use App\Models\MatchModel;
use App\Models\Player;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'goalID' => fake()->uuid(),
            'minute' => fake()->numberBetween(1, 90),
            'ownGoal' => fake()->boolean(10),
            'isPenalty' => fake()->boolean(20),
            'matchID' => MatchModel::factory(),
            'scoredBy' => Player::factory(),
        ];
    }
}
