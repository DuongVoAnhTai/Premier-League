<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamRequest;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TeamController extends Controller
{
    public function getTeams()
    {
        $teams = Team::select('teamID', 'name')->get();
        return response()->json($teams);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::with(['tournament'])->get();
        return response()->json($teams);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamRequest $request)
    {
        $team = Team::create([
            'teamID' => Str::uuid(),
            'name' => $request->name,
            'coach' => $request->coach,
            'city' => $request->city,
            'country' => $request->country,
            'logo' => $request->logo,
            'tournamentID' => $request->tournamentID,
        ]);

        $team->load(['tournament']);
        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $team = Team::with(['tournament'])->findOrFail($id);
        return response()->json($team);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTeamRequest $request, string $id)
    {
        $team = Team::findOrFail($id);
        $team->update([
            'name' => $request->name,
            'coach' => $request->coach,
            'city' => $request->city,
            'country' => $request->country,
            'logo' => $request->logo,
            'tournamentID' => $request->tournamentID,
        ]);

        $team->load(['tournament']);
        return response()->json($team, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Team::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
