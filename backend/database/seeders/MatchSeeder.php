<?php

namespace Database\Seeders;

use App\Models\MatchModel;
use App\Models\Schedule;
use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schedules = Schedule::all();
        $teams = Team::all()->pluck('teamID')->toArray();

        foreach ($schedules as $schedule) {
            for ($i = 0; $i < 2; $i++) { // Mỗi lịch có 2 trận
                $team1 = fake()->randomElement($teams);
                $team2 = fake()->randomElement(array_diff($teams, [$team1])); // Đội 2 khác đội 1

                MatchModel::create([
                    'matchID' => fake()->uuid(),
                    'scheduleID' => $schedule->scheduleID,
                    'team1ID' => $team1,
                    'team2ID' => $team2,
                    'matchDate' => fake()->dateTimeBetween('2025-01-01', '2025-12-31'),
                ]);
            }
        }
    }
}
