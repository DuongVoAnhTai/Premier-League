<?php

namespace Database\Factories;

use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'teamID' => fake()->uuid(),
            'name' => fake()->word() . ' FC',
            'coach' => fake()->name(),
            'city' => fake()->city(),
            'country' => fake()->country(),
            'logo' => fake()->imageUrl(),
            'tournamentID' => Tournament::factory(),
        ];
    }
}
