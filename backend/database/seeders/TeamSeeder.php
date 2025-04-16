<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tournaments = Tournament::all();
        $tournamentID = $tournaments->first()->tournamentID;

        $teams = [
            [
                'teamID' => fake()->uuid(),
                'name' => 'Arsenal',
                'coach' => 'Mikel Arteta',
                'city' => 'London',
                'country' => 'England',
                'logo' => 'arsenal.png',
                'tournamentID' => $tournamentID,
            ],
            [
                'teamID' => fake()->uuid(),
                'name' => 'Manchester United',
                'coach' => 'Erik ten Hag',
                'city' => 'Manchester',
                'country' => 'England',
                'logo' => 'manutd.png',
                'tournamentID' => $tournamentID,
            ],
            [
                'teamID' => fake()->uuid(),
                'name' => 'Chelsea',
                'coach' => 'Enzo Maresca',
                'city' => 'London',
                'country' => 'England',
                'logo' => 'chelsea.png',
                'tournamentID' => $tournamentID,
            ],
            [
                'teamID' => fake()->uuid(),
                'name' => 'Liverpool',
                'coach' => 'Arne Slot',
                'city' => 'Liverpool',
                'country' => 'England',
                'logo' => 'liverpool.png',
                'tournamentID' => $tournamentID,
            ],
            [
                'teamID' => fake()->uuid(),
                'name' => 'Manchester City',
                'coach' => 'Pep Guardiola',
                'city' => 'Manchester',
                'country' => 'England',
                'logo' => 'mancity.png',
                'tournamentID' => $tournamentID,
            ],
        ];

        foreach ($teams as $team) {
            Team::create($team);
        }
    }
}
