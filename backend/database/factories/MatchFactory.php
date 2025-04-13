<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Match>
 */
class MatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'matchID' => fake()->uuid(),
            'team1ID' => Team::factory(),
            'team2ID' => Team::factory(),
            'matchDate' => fake()->dateTimeBetween('2025-01-01', '2025-12-31'),
        ];
    }
}
