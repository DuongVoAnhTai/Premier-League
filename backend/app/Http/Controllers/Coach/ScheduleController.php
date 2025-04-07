<?php

namespace App\Http\Controllers\Coach;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ScheduleController extends Controller
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
        $schedules = Schedule::where('tournamentID', $tournamentID)->with('matches')->get();
        return response()->json($schedules);
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
