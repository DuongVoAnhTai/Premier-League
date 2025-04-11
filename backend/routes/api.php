<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);

    // //Admin routes
    // Route::prefix('admin')->group(function () {
    //     Route::apiResource('tournaments', TournamentController::class);
    //     Route::post('tournaments/{tournamentID}/teams', [TournamentController::class, 'addTeam']);
    //     Route::post('tournaments/{tournamentID}/generate-schedule', [TournamentController::class, 'generateSchedule']);
    //     Route::post('tournaments/{tournamentID}/update-ranking', [TournamentController::class, 'updateRanking']);
    //     Route::post('schedules/{scheduleID}/approve', [AdminScheduleController::class, 'approveSchedule']);
    //     Route::post('schedules/{scheduleID}/matches', [AdminMatchController::class, 'addMatch']);
    //     Route::post('matches/{matchID}/result', [ResultController::class, 'saveResult']);
    // });
   
    // // Coach Routes
    // Route::prefix('coach')->group(function () {
    //     Route::get('tournaments/{tournamentID}/schedules', [CoachScheduleController::class, 'index']);
    //     Route::get('schedules/{scheduleID}/matches', [CoachMatchController::class, 'index']);
    //     Route::get('tournaments/{tournamentID}/rankings', [CoachRankingController::class, 'index']);
    // });

    // Admin-only routes
    Route::middleware('role:admin')->group(function () {
        Route::post('/tournaments', [TournamentController::class, 'store']);
        Route::put('/tournaments/{id}', [TournamentController::class, 'update']);
        Route::delete('/tournaments/{id}', [TournamentController::class, 'destroy']);
        Route::post('/teams', [TeamController::class, 'store']);
    });

    // Public routes
    Route::get('/tournaments', [TournamentController::class, 'index']);
    Route::get('/tournaments/{id}', [TournamentController::class, 'show']);
    Route::get('/teams', [TeamController::class, 'index']);
    Route::get('/teams/{id}', [TeamController::class, 'show']);
});