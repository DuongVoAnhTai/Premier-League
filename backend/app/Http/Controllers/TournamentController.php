<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'Tournament list',
            'data' => [
                [
                    'id' => 1,
                    'name' => 'Tournament 1',
                    'date' => '2023-10-01',
                    'location' => 'Location 1',
                ],
                [
                    'id' => 2,
                    'name' => 'Tournament 2',
                    'date' => '2023-11-01',
                    'location' => 'Location 2',
                ],
            ],
        ]);
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
