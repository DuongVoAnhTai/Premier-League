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
        $tournament = Tournament::first();
        $teamsData = [
            ['teamID' => 'team1', 'name' => 'Arsenal', 'coach' => 'Mikel Arteta', 'points' => 0, 'logo' => 'arsenal.png'],
            ['teamID' => 'team2', 'name' => 'Manchester United', 'coach' => 'Erik ten Hag', 'points' => 0, 'logo' => 'mu.png'],
            ['teamID' => 'team3', 'name' => 'Chelsea', 'coach' => 'Enzo Maresca', 'points' => 0, 'logo' => 'chelsea.png'],
            ['teamID' => 'team4', 'name' => 'Liverpool', 'coach' => 'Arne Slot', 'points' => 0, 'logo' => 'liverpool.png'],
            ['teamID' => 'team5', 'name' => 'Manchester City', 'coach' => 'Pep Guardiola', 'points' => 0, 'logo' => 'mancity.png'],
            ['teamID' => 'team6', 'name' => 'Tottenham', 'coach' => 'Ange Postecoglou', 'points' => 0, 'logo' => 'tottenham.png'],
            ['teamID' => 'team7', 'name' => 'Leicester City', 'coach' => 'Steve Cooper', 'points' => 0, 'logo' => 'leicester.png'],
            ['teamID' => 'team8', 'name' => 'Everton', 'coach' => 'Sean Dyche', 'points' => 0, 'logo' => 'everton.png'],
            ['teamID' => 'team9', 'name' => 'West Ham', 'coach' => 'Julen Lopetegui', 'points' => 0, 'logo' => 'westham.png'],
            ['teamID' => 'team10', 'name' => 'Aston Villa', 'coach' => 'Unai Emery', 'points' => 0, 'logo' => 'astonvilla.png'],
        ];

        foreach ($teamsData as $teamData) {
            $team = Team::create($teamData);
            // $tournament->teams()->attach($team->teamID);
        }
    }
}
