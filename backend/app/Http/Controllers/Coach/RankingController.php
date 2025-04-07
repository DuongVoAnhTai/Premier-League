<?php

namespace App\Http\Controllers\Coach;

use App\Models\Ranking;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class RankingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('coach');
    }
    /**
     * Display a listing of the resource.
     */
    public function index($tournamentID)
    {
        $rankings = Ranking::where('tournamentID', $tournamentID)->with('team')->get();
        return response()->json($rankings);
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
