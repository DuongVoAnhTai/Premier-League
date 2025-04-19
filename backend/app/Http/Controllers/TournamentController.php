<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTournamentRequest;
use App\Models\Standing;
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

    /**
     * Check if the tournament has completed based on matches played by each team.
     */
    public function checkTournamentCompletion(string $tournamentID)
    {
        // Tìm giải đấu
        $tournament = Tournament::findOrFail($tournamentID);

        // Đếm số đội trong giải (dựa trên standings hoặc teams)
        $teamCount = Standing::where('tournamentID', $tournamentID)
            ->distinct('teamID')
            ->count('teamID');

        if ($teamCount === 0) {
            return response()->json([
                'message' => 'No teams found for this tournament.',
                'isComplete' => false,
            ], 200);
        }

        // Tính số trận mỗi đội cần thi đấu: 2 * (N - 1)
        $requiredMatchesPerTeam = 2 * ($teamCount - 1);

        // Lấy danh sách đội và số trận đã thi đấu
        $standings = Standing::where('tournamentID', $tournamentID)
            ->with('team')
            ->get()
            ->map(function ($standing) use ($requiredMatchesPerTeam) {
                return [
                    'teamID' => $standing->teamID,
                    'teamName' => $standing->team->name ?? 'Unknown',
                    'matchesPlayed' => $standing->played,
                    'matchesRequired' => $requiredMatchesPerTeam,
                    'isComplete' => $standing->played >= $requiredMatchesPerTeam,
                ];
            });

        // Kiểm tra xem tất cả đội đã thi đấu đủ trận chưa
        $isTournamentComplete = $standings->every(function ($team) use ($requiredMatchesPerTeam) {
            return $team['matchesPlayed'] >= $requiredMatchesPerTeam;
        });

        // Cập nhật trạng thái giải đấu nếu hoàn thành (tùy chọn)
        if ($isTournamentComplete && $tournament->status !== 'Completed') {
            $tournament->update(['status' => 'Completed']);
        }

        // Tổng số trận trong giải
        $totalMatches = $teamCount * ($teamCount - 1);

        return response()->json([
            'tournamentID' => $tournamentID,
            'tournamentName' => $tournament->name,
            'teamCount' => $teamCount,
            'requiredMatchesPerTeam' => $requiredMatchesPerTeam,
            'totalMatchesInTournament' => $totalMatches,
            'isTournamentComplete' => $isTournamentComplete,
            'teams' => $standings,
        ], 200);
    }
}
