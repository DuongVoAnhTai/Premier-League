<?php

namespace App\Http\Controllers\Admin;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;

class MatchController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin');
    }

    public function addMatch(Request $request, $scheduleID)
    {
        $schedule = Schedule::findOrFail($scheduleID);
        $request->validate([
            'team1ID' => 'required|string|exists:teams,teamID',
            'team2ID' => 'required|string|exists:teams,teamID',
            'matchDate' => 'required|date',
        ]);

        $match = $schedule->matches()->create([
            'matchID' => Str::uuid(),
            'team1ID' => $request->team1ID,
            'team2ID' => $request->team2ID,
            'matchDate' => $request->matchDate,
            'status' => 'upcoming',
            'scheduleID' => $scheduleID,
        ]);

        return response()->json($match, 201);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
