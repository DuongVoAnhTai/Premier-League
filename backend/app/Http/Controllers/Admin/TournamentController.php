<?php

namespace App\Http\Controllers\Admin;


use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin');
    }

    public function index()
    {
        return Tournament::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after:startDate',
        ]);

        $tournament = Tournament::created([
            'tournamentID' => Str::uuid(),
            'name' => $request->name,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
        ]);

        return response()->json(
            $tournament,
            201
        );
    }

    public function addTeam(Request $request, $tournamentID){
        $tournament = Tournament::findOrFail($tournamentID);
        $request->validate([
            'name' => 'required|string',
            'coach' => 'required|string',
        ]);

        $team = $tournament->teams()->create([
            'teamID' => Str::uuid(),
            'name' => $request->name,
            'coach' => $request->coach,
            'points' => 0,
            'tournamentID' => $tournamentID,
        ]);

        return response()->json(
            $team,
            201
        );
    }

    public function generateSchedule($tournamentID){
        $tournament = Tournament::findOrFail($tournamentID);
        $teams = $tournament->teams;

        if ($teams->count() < 2) {
            return response()->json(['message' => 'Not enough teams to generate a schedule'], 400);
        }

        $schedule = $tournament->schedules()->create([
            'scheduleID' => Str::uuid(),
            'creationDate' => now(),
            'tournamentID' => $tournamentID,
        ]);

        $teamIDs = $teams->pluck('teamID')->toArray();
        for ($i = 0; $i < count($teamIDs); $i++) {
            for ($j = $i + 1; $j < count($teamIDs); $j++) {
                $schedule->matches()->create([
                    'matchID' => Str::uuid(),
                    'team1ID' => $teamIDs[$i],
                    'team2ID' => $teamIDs[$j],
                    'matchDate' => now()->addDays($i + $j),
                    'status' => 'upcoming',
                    'scheduleID' => $schedule->scheduleID,
                ]);
            }
        }
        return response()->json([
            $schedule->load('matches')
        ], 201);
    }

    public function updateRanking($tournamentID)
    {
        $tournament = Tournament::findOrFail($tournamentID);
        $teams = $tournament->teams;

        foreach ($teams as $index => $team) {
            $ranking = $tournament->rankings()->updateOrCreate(
                ['teamID' => $team->teamID],
                [
                    'rankingID' => Str::uuid(),
                    'points' => $team->points,
                    'rank' => $index + 1,
                    'tournamentID' => $tournamentID,
                ]
            );
        }

        return response()->json($tournament->rankings);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
