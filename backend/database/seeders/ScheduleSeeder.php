<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\Tournament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournament = Tournament::first();
        $locations = ['London', 'Manchester', 'Liverpool', 'Birmingham', 'Leicester'];

        for ($i = 0; $i < 10; $i++) {
            Schedule::create([
                'scheduleID' => fake()->uuid(),
                'tournamentID' => $tournament->tournamentID,
                'creationDate' => fake()->dateTimeBetween('2025-01-01', '2025-12-31'),
                'location' => fake()->randomElement($locations),
            ]);
        }
    }
}
