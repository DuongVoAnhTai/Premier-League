<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlayerRequest;
use App\Models\Player;
use App\Models\Position;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $players = Player::with(['team'])->get();
        return response()->json($players);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayerRequest $request)
    {
        $player = Player::create([
            'playerID' => Str::uuid(),
            'name' => $request->name,
            'position' => $request->position,
            'birthDate' => $request->birthDate,
            'nationality' => $request->nationality,
            'image' => $request->image,
            'teamID' => $request->teamID,
        ]);

        $player->load(['team']);
        return response()->json($player, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $player = Player::with(['team'])->findOrFail($id);
        return response()->json($player);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePlayerRequest $request, string $id)
    {
        $player = Player::findOrFail($id);

        $player->update([
            'name' => $request->name,
            'position' => $request->position,
            'birthDate' => $request->birthDate,
            'nationality' => $request->nationality,
            'image' => $request->image,
            'teamID' => $request->teamID,
        ]);

        $player->load(['team']);
        return response()->json($player);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $player = Player::findOrFail($id);
        $player->delete();
        return response()->json(['message' => 'Player deleted successfully'], 204);
    }
}
