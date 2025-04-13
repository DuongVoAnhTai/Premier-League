<?php

namespace Database\Factories;

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
        $teams = [
            'Arsenal', 'Manchester United', 'Chelsea', 'Liverpool', 'Manchester City',
            'Tottenham', 'Leicester City', 'Everton', 'West Ham', 'Aston Villa'
        ];
        return [
            'teamID' => fake()->uuid(),
            'name' => fake()->randomElement($teams),
            'coach' => fake()->name(),
            'points' => 0,
            'logo' => fake()->imageUrl(100, 100, 'sports'),
        ];
    }
}
