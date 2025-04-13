<?php

namespace Database\Factories;

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
        $score1 = fake()->numberBetween(0, 5);
        $score2 = fake()->numberBetween(0, 5);
        return [
            'resultId' => fake()->uuid(),
            'scoreTeam1' => $score1,
            'scoreTeam2' => $score2,
        ];
    }
}
