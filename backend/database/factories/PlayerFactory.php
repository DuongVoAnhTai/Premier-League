<?php

namespace Database\Factories;

use App\Models\Position;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Player>
 */
class PlayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $firstNames = ['Bukayo', 'Gabriel', 'Kai', 'Mohamed', 'Erling', 'Kevin', 'Son', 'Harry', 'Virgil', 'Trent'];
        $lastNames = ['Saka', 'Magalhaes', 'Havertz', 'Salah', 'Haaland', 'De Bruyne', 'Heung-min', 'Kane', 'Van Dijk', 'Alexander-Arnold'];

        return [
            'playerID' => fake()->uuid(),
            'name' => fake()->randomElement($firstNames) . ' ' . fake()->randomElement($lastNames),
            'position' => fake()->randomElement(['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD']),
            'birthDate' => fake()->dateTimeBetween('-30 years', '-18 years'),
            'nationality' => fake()->country(),
            'image' => fake()->imageUrl(),
            'teamID' => Team::factory(),
        ];
    }
}
