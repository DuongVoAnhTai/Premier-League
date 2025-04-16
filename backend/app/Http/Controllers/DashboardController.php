<?php

namespace App\Http\Controllers;

use App\Models\MatchModel;
use App\Models\Player;
use App\Models\Team;
use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function getTournaments()
    {
        $tournaments = Tournament::select('tournamentID', 'name', 'startDate', 'endDate', 'status')->get()->map(function ($tournament) {
            $currentDate = now();
            $startDate = \Carbon\Carbon::parse($tournament->startDate);
            $endDate = \Carbon\Carbon::parse($tournament->endDate);
    
            // Xác định isCurrent dựa trên startDate và endDate
            $isCurrent = false;
            if ($currentDate->between($startDate, $endDate)) {
                $isCurrent = true;
            }
    
            return [
                'id' => $tournament->tournamentID,
                'name' => $tournament->name,
                'status' => $tournament->status, // Sử dụng cột status từ database
                'isCurrent' => $isCurrent,
            ];
        });

        return response()->json($tournaments);
    }

    public function getUserCardData()
    {
        $totalTournaments = Tournament::count();
        $activeTeams = Team::count();
        $scheduledMatches = MatchModel::count();
        $totalPlayers = Player::count();

        return response()->json([
            'total_tournament' => $totalTournaments,
            'active_team' => $activeTeams,
            'scheduled_matches' => $scheduledMatches,
            'total_player' => $totalPlayers,
        ]);
    }

    public function getTeamDistribution()
    {
        $groups = Team::select('name')
            ->withCount('players')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->name,
                    'players' => $item->players_count,
                ];
            });

        return response()->json($groups);
    }

    public function getPlayerAgeDistribution()
    {
        $players = Player::select('birthDate')->get();

        $ageGroups = [
            'Under 20' => 0,
            '20-25' => 0,
            '26-30' => 0,
            '31-35' => 0,
            'Over 35' => 0,
        ];

        $currentYear = Carbon::now()->year;

        foreach ($players as $player) {
            $birthYear = Carbon::parse($player->birthDate)->year;
            $age = $currentYear - $birthYear;

            if ($age < 20) {
                $ageGroups['Under 20']++;
            } elseif ($age <= 25) {
                $ageGroups['20-25']++;
            } elseif ($age <= 30) {
                $ageGroups['26-30']++;
            } elseif ($age <= 35) {
                $ageGroups['31-35']++;
            } else {
                $ageGroups['Over 35']++;
            }
        }

        $data = array_map(function ($key, $value) {
            return ['name' => $key, 'total' => $value];
        }, array_keys($ageGroups), $ageGroups);

        return response()->json($data);
    }
}
