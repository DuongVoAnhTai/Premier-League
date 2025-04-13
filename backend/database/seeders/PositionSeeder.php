<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            ['positionID' => 'pos1', 'name' => 'Goalkeeper'],
            ['positionID' => 'pos2', 'name' => 'Defender'],
            ['positionID' => 'pos3', 'name' => 'Midfielder'],
            ['positionID' => 'pos4', 'name' => 'Forward'],
        ];

        foreach ($positions as $position) {
            Position::create($position);
        }
    }
}
