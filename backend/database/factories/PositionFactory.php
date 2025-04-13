<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Position>
 */
class PositionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
        return [
            'positionID' => fake()->uuid(),
            'name' => fake()->randomElement($positions),
        ];
    }
}
