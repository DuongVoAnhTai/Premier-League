<?php

namespace App\Http\Controllers\Admin;

use App\Models\MatchModel;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;

class ResultController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin');
    }

    public function saveResult(Request $request, $matchID)
    {
        $match = MatchModel::findOrFail($matchID);
        $request->validate([
            'scoreTeam1' => 'required|integer|min:0',
            'scoreTeam2' => 'required|integer|min:0',
        ]);

        $result = $match->result()->create([
            'resultID' => Str::uuid(),
            'matchID' => $matchID,
            'scoreTeam1' => $request->scoreTeam1,
            'scoreTeam2' => $request->scoreTeam2,
        ]);

        // Update team points
        $team1 = $match->team1;
        $team2 = $match->team2;

        if ($request->scoreTeam1 > $request->scoreTeam2) {
            $team1->points += 3;
        } elseif ($request->scoreTeam1 < $request->scoreTeam2) {
            $team2->points += 3;
        } else {
            $team1->points += 1;
            $team2->points += 1;
        }

        $team1->save();
        $team2->save();

        return response()->json($result, 201);
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
