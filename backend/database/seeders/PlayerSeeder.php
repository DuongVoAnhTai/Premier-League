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
        $positions = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'];

        $playersData = [
            ['name' => 'Bukayo Saka', 'birthDate' => '2001-09-05', 'position' => 'FORWARD', 'nationality' => 'England', 'image' => 'saka.jpg'],
            ['name' => 'Gabriel Martinelli', 'birthDate' => '2001-06-18', 'position' => 'FORWARD', 'nationality' => 'Brazil', 'image' => 'martinelli.jpg'],
            ['name' => 'Aaron Ramsdale', 'birthDate' => '1998-05-14', 'position' => 'GOALKEEPER', 'nationality' => 'England', 'image' => 'ramsdale.jpg'],
            ['name' => 'William Saliba', 'birthDate' => '2001-03-24', 'position' => 'DEFENDER', 'nationality' => 'France', 'image' => 'saliba.jpg'],
            ['name' => 'Declan Rice', 'birthDate' => '1999-01-14', 'position' => 'MIDFIELDER', 'nationality' => 'England', 'image' => 'rice.jpg'],
            // Manchester United
            ['name' => 'Bruno Fernandes', 'birthDate' => '1994-09-08', 'position' => 'MIDFIELDER', 'nationality' => 'Portugal', 'image' => 'fernandes.jpg'],
            ['name' => 'Marcus Rashford', 'birthDate' => '1997-10-31', 'position' => 'FORWARD', 'nationality' => 'England', 'image' => 'rashford.jpg'],
            ['name' => 'Andre Onana', 'birthDate' => '1996-04-02', 'position' => 'GOALKEEPER', 'nationality' => 'Cameroon', 'image' => 'onana.jpg'],
            ['name' => 'Lisandro Martinez', 'birthDate' => '1998-01-18', 'position' => 'DEFENDER', 'nationality' => 'Argentina', 'image' => 'martinez.jpg'],
            ['name' => 'Kobbie Mainoo', 'birthDate' => '2005-04-19', 'position' => 'MIDFIELDER', 'nationality' => 'England', 'image' => 'mainoo.jpg'],
            // Chelsea
            ['name' => 'Cole Palmer', 'birthDate' => '2002-05-06', 'position' => 'MIDFIELDER', 'nationality' => 'England', 'image' => 'palmer.jpg'],
            ['name' => 'Nicolas Jackson', 'birthDate' => '2001-06-20', 'position' => 'FORWARD', 'nationality' => 'Senegal', 'image' => 'jackson.jpg'],
            ['name' => 'Robert Sanchez', 'birthDate' => '1997-11-18', 'position' => 'GOALKEEPER', 'nationality' => 'Spain', 'image' => 'sanchez.jpg'],
            ['name' => 'Levi Colwill', 'birthDate' => '2003-02-26', 'position' => 'DEFENDER', 'nationality' => 'England', 'image' => 'colwill.jpg'],
            ['name' => 'Enzo Fernandez', 'birthDate' => '2001-01-17', 'position' => 'MIDFIELDER', 'nationality' => 'Argentina', 'image' => 'fernandez.jpg'],
            // Liverpool
            ['name' => 'Mohamed Salah', 'birthDate' => '1992-06-15', 'position' => 'FORWARD', 'nationality' => 'Egypt', 'image' => 'salah.jpg'],
            ['name' => 'Virgil van Dijk', 'birthDate' => '1991-07-08', 'position' => 'DEFENDER', 'nationality' => 'Netherlands', 'image' => 'vandijk.jpg'],
            ['name' => 'Alisson Becker', 'birthDate' => '1992-10-02', 'position' => 'GOALKEEPER', 'nationality' => 'Brazil', 'image' => 'alisson.jpg'],
            ['name' => 'Trent Alexander-Arnold', 'birthDate' => '1998-10-07', 'position' => 'DEFENDER', 'nationality' => 'England', 'image' => 'trent.jpg'],
            ['name' => 'Dominik Szoboszlai', 'birthDate' => '2000-10-25', 'position' => 'MIDFIELDER', 'nationality' => 'Hungary', 'image' => 'szoboszlai.jpg'],
            // Manchester City
            ['name' => 'Erling Haaland', 'birthDate' => '2000-07-21', 'position' => 'FORWARD', 'nationality' => 'Norway', 'image' => 'haaland.jpg'],
            ['name' => 'Kevin De Bruyne', 'birthDate' => '1991-06-28', 'position' => 'MIDFIELDER', 'nationality' => 'Belgium', 'image' => 'debruyne.jpg'],
            ['name' => 'Ederson Moraes', 'birthDate' => '1993-08-17', 'position' => 'GOALKEEPER', 'nationality' => 'Brazil', 'image' => 'ederson.jpg'],
            ['name' => 'Ruben Dias', 'birthDate' => '1997-05-14', 'position' => 'DEFENDER', 'nationality' => 'Portugal', 'image' => 'dias.jpg'],
            ['name' => 'Phil Foden', 'birthDate' => '2000-05-28', 'position' => 'MIDFIELDER', 'nationality' => 'England', 'image' => 'foden.jpg'],
        ];

        foreach ($teams as $team) {
            for ($i = 0; $i < 20; $i++) {
                $playerData = $i < count($playersData) ? $playersData[$i] : [
                    'name' => fake()->name(),
                    'birthDate' => fake()->dateTimeBetween('-30 years', '-18 years')->format('Y-m-d'),
                    'position' => fake()->randomElement($positions),
                    'nationality' => fake()->country(),
                    'image' => null,
                ];
                Player::create(array_merge($playerData, [
                    'playerID' => fake()->uuid(),
                    'teamID' => $team->teamID,
                ]));
            }
        }
    }
}
