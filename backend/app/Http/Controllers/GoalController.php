<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\StoreResultRequest;
use App\Models\Goal;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goals = Goal::with(['match', 'player', 'match.homeTeam', 'match.awayTeam'])->get();
        return response()->json($goals);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGoalRequest $request)
    {
        $goal = Goal::create([
            'goalID' => Str::uuid(),
            'minute' => $request->minute,
            'ownGoal' => $request->ownGoal ?? false,
            'isPenalty' => $request->isPenalty ?? false,
            'matchID' => $request->matchID,
            'scoredBy' => $request->scoredBy,
        ]);

        $goal->saveResult();
        $goal->load(['match', 'player']);
        return response()->json($goal, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $goal = Goal::with(['match', 'player'])->findOrFail($id);
        return response()->json($goal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreGoalRequest $request, string $id)
    {
        $goal = Goal::findOrFail($id);
        $goal->update([
            'minute' => $request->minute,
            'ownGoal' => $request->ownGoal,
            'isPenalty' => $request->isPenalty,
            'matchID' => $request->matchID,
            'scoredBy' => $request->scoredBy,
        ]);

        $goal->saveResult();
        $goal->load(['match', 'player']);
        return response()->json($goal, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $goal = Goal::findOrFail($id);
        $goal->delete();
        $goal->match->updateAfterMatch();
        return response()->json(null, 204);
    }
}
