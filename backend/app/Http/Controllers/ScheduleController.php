<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedules = Schedule::with('tournament')->get();
        return response()->json($schedules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'creationDate' => 'required|date',
            'location' => 'required|string|max:255',
            'tournamentID' => 'required|exists:tournaments,tournamentID',
        ]);

        $schedule = Schedule::create([
            'scheduleID' => \Illuminate\Support\Str::uuid(),
            'creationDate' => $request->creationDate,
            'location' => $request->location,
            'tournamentID' => $request->tournamentID,
        ]);

        $schedule->load('tournament');
        return response()->json($schedule, 201);
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
        $schedule = Schedule::findOrFail($id);

        $request->validate([
            'creationDate' => 'required|date',
            'location' => 'required|string|max:255',
            'tournamentID' => 'required|exists:tournaments,tournamentID',
        ]);

        $schedule->update([
            'creationDate' => $request->creationDate,
            'location' => $request->location,
            'tournamentID' => $request->tournamentID,
        ]);

        $schedule->load('tournament');
        return response()->json($schedule);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();

        return response()->json(['message' => 'Schedule deleted successfully']);
    }
}
