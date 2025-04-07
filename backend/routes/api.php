<?php

use App\Http\Controllers\Admin\TournamentController;
use App\Http\Controllers\Admin\ScheduleController as AdminScheduleController;
use App\Http\Controllers\Admin\MatchController as AdminMatchController;
use App\Http\Controllers\Admin\ResultController;
use App\Http\Controllers\Coach\ScheduleController as CoachScheduleController;
use App\Http\Controllers\Coach\MatchController as CoachMatchController;
use App\Http\Controllers\Coach\RankingController as CoachRankingController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);

    //Admin routes
    Route::prefix('admin')->group(function () {
        Route::apiResource('tournaments', TournamentController::class);
        Route::post('tournaments/{tournamentID}/teams', [TournamentController::class, 'addTeam']);
        Route::post('tournaments/{tournamentID}/generate-schedule', [TournamentController::class, 'generateSchedule']);
        Route::post('tournaments/{tournamentID}/update-ranking', [TournamentController::class, 'updateRanking']);
        Route::post('schedules/{scheduleID}/approve', [AdminScheduleController::class, 'approveSchedule']);
        Route::post('schedules/{scheduleID}/matches', [AdminMatchController::class, 'addMatch']);
        Route::post('matches/{matchID}/result', [ResultController::class, 'saveResult']);
    });
   
    // Coach Routes
    Route::prefix('coach')->group(function () {
        Route::get('tournaments/{tournamentID}/schedules', [CoachScheduleController::class, 'index']);
        Route::get('schedules/{scheduleID}/matches', [CoachMatchController::class, 'index']);
        Route::get('tournaments/{tournamentID}/rankings', [CoachRankingController::class, 'index']);
    });
});