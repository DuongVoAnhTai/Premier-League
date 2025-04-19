<?php

namespace App\Http\Controllers;

use App\Models\Standing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        // Validation rules
        $validator = Validator::make($request->all(), [
            'played' => 'required|integer|min:0',
            'won' => 'required|integer|min:0',
            'draw' => 'required|integer|min:0',
            'lost' => 'required|integer|min:0',
            'goalsFor' => 'required|integer|min:0',
            'goalsAgainst' => 'required|integer|min:0',
            'teamID' => 'required|exists:teams,teamID',
            'tournamentID' => 'required|exists:tournaments,tournamentID',
        ]);

        // Kiểm tra logic played = won + draw + lost
        $validator->after(function ($validator) use ($request) {
            $played = $request->input('played');
            $won = $request->input('won');
            $draw = $request->input('draw');
            $lost = $request->input('lost');

            if ($played !== ($won + $draw + $lost)) {
                $validator->errors()->add('played', 'The number of played matches must equal won + draw + lost.');
            }
        });

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tạo chuỗi form tự động (W-D-L)
        $form = '';
        $matches = [];
        for ($i = 0; $i < $request->won; $i++) {
            $matches[] = 'W';
        }
        for ($i = 0; $i < $request->draw; $i++) {
            $matches[] = 'D';
        }
        for ($i = 0; $i < $request->lost; $i++) {
            $matches[] = 'L';
        }
        $form = implode('', $matches);

        // Tính points và goalDifference
        $points = ($request->won * 3) + ($request->draw * 1);
        $goalDifference = $request->goalsFor - $request->goalsAgainst;

        $standing = Standing::create([
            'standingID' => Str::uuid(),
            'played' => $request->played,
            'won' => $request->won,
            'draw' => $request->draw,
            'lost' => $request->lost,
            'goalsFor' => $request->goalsFor,
            'goalsAgainst' => $request->goalsAgainst,
            'goalDifference' => $goalDifference,
            'points' => $points,
            'form' => $form,
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

        // Validation rules
        $validator = Validator::make($request->all(), [
            'played' => 'required|integer|min:0',
            'won' => 'required|integer|min:0',
            'draw' => 'required|integer|min:0',
            'lost' => 'required|integer|min:0',
            'goalsFor' => 'required|integer|min:0',
            'goalsAgainst' => 'required|integer|min:0',
            'teamID' => 'required|exists:teams,teamID',
            'tournamentID' => 'required|exists:tournaments,tournamentID',
        ]);

        // Kiểm tra logic played = won + draw + lost
        $validator->after(function ($validator) use ($request) {
            $played = $request->input('played');
            $won = $request->input('won');
            $draw = $request->input('draw');
            $lost = $request->input('lost');

            if ($played !== ($won + $draw + $lost)) {
                $validator->errors()->add('played', 'The number of played matches must equal won + draw + lost.');
            }
        });

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tạo chuỗi form tự động (W-D-L)
        $form = '';
        $matches = [];
        for ($i = 0; $i < $request->won; $i++) {
            $matches[] = 'W';
        }
        for ($i = 0; $i < $request->draw; $i++) {
            $matches[] = 'D';
        }
        for ($i = 0; $i < $request->lost; $i++) {
            $matches[] = 'L';
        }
        $form = implode('', $matches);

        // Tính points và goalDifference
        $points = ($request->won * 3) + ($request->draw * 1);
        $goalDifference = $request->goalsFor - $request->goalsAgainst;

        $standing->update([
            'played' => $request->played,
            'won' => $request->won,
            'draw' => $request->draw,
            'lost' => $request->lost,
            'goalsFor' => $request->goalsFor,
            'goalsAgainst' => $request->goalsAgainst,
            'goalDifference' => $goalDifference,
            'points' => $points,
            'form' => $form,
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
