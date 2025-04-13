<?php

namespace Database\Seeders;

use App\Models\Player;
use App\Models\Position;
use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = Team::all();
        $positions = Position::all();

        $playersData = [
            ['name' => 'Bukayo Saka', 'dateOfBirth' => '2001-09-05', 'positionID' => $positions->where('name', 'Forward')->first()->positionID],
            ['name' => 'Gabriel Martinelli', 'dateOfBirth' => '2001-06-18', 'positionID' => $positions->where('name', 'Forward')->first()->positionID],
            ['name' => 'Aaron Ramsdale', 'dateOfBirth' => '1998-05-14', 'positionID' => $positions->where('name', 'Goalkeeper')->first()->positionID],
            ['name' => 'William Saliba', 'dateOfBirth' => '2001-03-24', 'positionID' => $positions->where('name', 'Defender')->first()->positionID],
            ['name' => 'Declan Rice', 'dateOfBirth' => '1999-01-14', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
            // Manchester United
            ['name' => 'Bruno Fernandes', 'dateOfBirth' => '1994-09-08', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
            ['name' => 'Marcus Rashford', 'dateOfBirth' => '1997-10-31', 'positionID' => $positions->where('name', 'Forward')->first()->positionID],
            ['name' => 'Andre Onana', 'dateOfBirth' => '1996-04-02', 'positionID' => $positions->where('name', 'Goalkeeper')->first()->positionID],
            ['name' => 'Lisandro Martinez', 'dateOfBirth' => '1998-01-18', 'positionID' => $positions->where('name', 'Defender')->first()->positionID],
            ['name' => 'Kobbie Mainoo', 'dateOfBirth' => '2005-04-19', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
            // Chelsea
            ['name' => 'Cole Palmer', 'dateOfBirth' => '2002-05-06', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
            ['name' => 'Nicolas Jackson', 'dateOfBirth' => '2001-06-20', 'positionID' => $positions->where('name', 'Forward')->first()->positionID],
            ['name' => 'Robert Sanchez', 'dateOfBirth' => '1997-11-18', 'positionID' => $positions->where('name', 'Goalkeeper')->first()->positionID],
            ['name' => 'Levi Colwill', 'dateOfBirth' => '2003-02-26', 'positionID' => $positions->where('name', 'Defender')->first()->positionID],
            ['name' => 'Enzo Fernandez', 'dateOfBirth' => '2001-01-17', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
            // Liverpool
            ['name' => 'Mohamed Salah', 'dateOfBirth' => '1992-06-15', 'positionID' => $positions->where('name', 'Forward')->first()->positionID],
            ['name' => 'Virgil van Dijk', 'dateOfBirth' => '1991-07-08', 'positionID' => $positions->where('name', 'Defender')->first()->positionID],
            ['name' => 'Alisson Becker', 'dateOfBirth' => '1992-10-02', 'positionID' => $positions->where('name', 'Goalkeeper')->first()->positionID],
            ['name' => 'Trent Alexander-Arnold', 'dateOfBirth' => '1998-10-07', 'positionID' => $positions->where('name', 'Defender')->first()->positionID],
            ['name' => 'Dominik Szoboszlai', 'dateOfBirth' => '2000-10-25', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
            // Manchester City
            ['name' => 'Erling Haaland', 'dateOfBirth' => '2000-07-21', 'positionID' => $positions->where('name', 'Forward')->first()->positionID],
            ['name' => 'Kevin De Bruyne', 'dateOfBirth' => '1991-06-28', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
            ['name' => 'Ederson Moraes', 'dateOfBirth' => '1993-08-17', 'positionID' => $positions->where('name', 'Goalkeeper')->first()->positionID],
            ['name' => 'Ruben Dias', 'dateOfBirth' => '1997-05-14', 'positionID' => $positions->where('name', 'Defender')->first()->positionID],
            ['name' => 'Phil Foden', 'dateOfBirth' => '2000-05-28', 'positionID' => $positions->where('name', 'Midfielder')->first()->positionID],
        ];

        foreach ($teams as $team) {
            // Mỗi đội có 20 cầu thủ
            for ($i = 0; $i < 20; $i++) {
                $playerData = $i < count($playersData) ? $playersData[$i] : [
                    'name' => fake()->name(),
                    'dateOfBirth' => fake()->dateTimeBetween('-30 years', '-18 years'),
                    'positionID' => fake()->randomElement($positions->pluck('positionID')->toArray()),
                ];
                Player::create(array_merge($playerData, [
                    'playerID' => fake()->uuid(),
                    'teamID' => $team->teamID,
                ]));
            }
        }
    }
}
