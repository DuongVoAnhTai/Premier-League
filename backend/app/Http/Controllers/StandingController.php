<?php

namespace App\Http\Controllers;

use App\Models\Standing;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $standings = Standing::with(['team', 'tournament'])->get();
        return response()->json($standings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $standing = Standing::create([
            'standingID' => Str::uuid(),
            'played' => $request->played,
            'won' => $request->won,
            'draw' => $request->draw,
            'lost' => $request->lost,
            'goalsFor' => $request->goalsFor,
            'goalsAgainst' => $request->goalsAgainst,
            'goalDifference' => $request->goalDifference,
            'points' => $request->points,
            'form' => $request->form,
            'teamID' => $request->teamID,
            'tournamentID' => $request->tournamentID,
        ]);

        $standing->load(['team', 'tournament']);
        return response()->json($standing, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $standing = Standing::with(['team', 'tournament'])->findOrFail($id);
        return response()->json($standing);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $standing = Standing::findOrFail($id);
        $standing->update([
            'played' => $request->played,
            'won' => $request->won,
            'draw' => $request->draw,
            'lost' => $request->lost,
            'goalsFor' => $request->goalsFor,
            'goalsAgainst' => $request->goalsAgainst,
            'goalDifference' => $request->goalDifference,
            'points' => $request->points,
            'form' => $request->form,
            'teamID' => $request->teamID,
            'tournamentID' => $request->tournamentID,
        ]);

        $standing->load(['team', 'tournament']);
        return response()->json($standing, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Standing::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
