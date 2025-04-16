<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMatchRequest;
use App\Models\Goal;
use App\Models\MatchModel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matches = MatchModel::with(['tournament', 'homeTeam', 'awayTeam'])->get();
        return response()->json($matches);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMatchRequest $request)
    {
        $match = MatchModel::create([
            'matchID' => Str::uuid(),
            'matchDate' => $request->matchDate,
            'time' => $request->time,
            'status' => $request->status,
            'homeScore' => $request->homeScore ?? 0,
            'awayScore' => $request->awayScore ?? 0,
            'tournamentID' => $request->tournamentID,
            'homeTeamID' => $request->homeTeamID,
            'awayTeamID' => $request->awayTeamID,
        ]);

        $match->load(['tournament', 'homeTeam', 'awayTeam']);
        return response()->json($match, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $match = MatchModel::with(['tournament', 'homeTeam', 'awayTeam'])->findOrFail($id);
        return response()->json($match);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreMatchRequest $request, string $id)
    {
        $match = MatchModel::findOrFail($id);
        $match->update([
            'matchDate' => $request->matchDate,
            'time' => $request->time,
            'status' => $request->status,
            'homeScore' => $request->homeScore,
            'awayScore' => $request->awayScore,
            'tournamentID' => $request->tournamentID,
            'homeTeamID' => $request->homeTeamID,
            'awayTeamID' => $request->awayTeamID,
        ]);

        $match->updateAfterMatch();
        $match->load(['tournament', 'homeTeam', 'awayTeam']);
        return response()->json($match, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        MatchModel::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
