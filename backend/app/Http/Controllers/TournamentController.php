<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTournamentRequest;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $tournaments = Tournament::select('tournamentID', 'name', 'startDate', 'endDate', 'status')->get();
        return response()->json($tournaments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTournamentRequest $request)
    {
        $tournament = Tournament::create([
            'tournamentID' => Str::uuid(),
            'name' => $request->name,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'status' => $request->status ?? 'upcoming',
        ]);

        return response()->json($tournament, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Tournament::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTournamentRequest $request, string $id)
    {
        $tournament = Tournament::findOrFail($id);
        $tournament->update([
            'name' => $request->name,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'status' => $request->status,
        ]);
        return response()->json($tournament, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Tournament::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
