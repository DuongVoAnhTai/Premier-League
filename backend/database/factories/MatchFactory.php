<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\Tournament;
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
        $team = Team::factory()->create();
        $tournament = Tournament::factory()->create();
        
        return [
            'matchID' => fake()->fake()->uuid(), 
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
        ];
    }
}
