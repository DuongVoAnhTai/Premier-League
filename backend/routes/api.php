<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StandingController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('/user/me', [AuthController::class, 'getCurrentUser']);
        Route::put('/user/update-profile', [UserController::class, 'updateProfile']);

        Route::prefix('dashboard')->group(function () {
            Route::get('/tournaments', [DashboardController::class, 'getTournaments']);
            Route::get('/user-cards', [DashboardController::class, 'getUserCardData']);
            Route::get('/team-distribution', [DashboardController::class, 'getTeamDistribution']);
            Route::get('/player-age-distribution', [DashboardController::class, 'getPlayerAgeDistribution']);
        });
        
        Route::prefix('tournament')->group(function () {
            Route::get('/tournaments', [TournamentController::class, 'index']);
            Route::post('/tournaments', [TournamentController::class, 'store']);
            Route::put('/tournaments/{id}', [TournamentController::class, 'update']);
            Route::delete('/tournaments/{id}', [TournamentController::class, 'destroy']);
            Route::delete('/tournaments/{id}', [TournamentController::class, 'destroy']);
            Route::get('/tournaments/{tournamentID}/completion', [TournamentController::class, 'checkTournamentCompletion']);
        });
        
        Route::prefix('team')->group(function () {
            Route::get('/teams', [TeamController::class, 'index']);
            Route::post('/teams', [TeamController::class, 'store']);
            Route::put('/teams/{id}', [TeamController::class, 'update']);
            Route::delete('/teams/{id}', [TeamController::class, 'destroy']);
        });
        
        Route::prefix('player')->group(function () {
            Route::get('/teams', [TeamController::class, 'getTeams']);
            Route::get('/players', [PlayerController::class, 'index']);
            Route::post('/players', [PlayerController::class, 'store']);
            Route::put('/players/{id}', [PlayerController::class, 'update']);
            Route::delete('/players/{id}', [PlayerController::class, 'destroy']);
        });
        
        Route::prefix('match')->group(function () {
            Route::get('/schedules', [ScheduleController::class, 'index']);
            Route::get('/matches', [MatchController::class, 'index']);
            Route::post('/matches', [MatchController::class, 'store']);
            Route::put('/matches/{id}', [MatchController::class, 'update']);
            Route::delete('/matches/{id}', [MatchController::class, 'destroy']);
        });
        
        Route::prefix('goal')->group(function () {
            Route::get('/goals', [GoalController::class, 'index']);
            Route::post('/goals', [GoalController::class, 'store']);
            Route::put('/goals/{id}', [GoalController::class, 'update']);
            Route::delete('/goals/{id}', [GoalController::class, 'destroy']);
        });
        
        Route::prefix('standing')->group(function () {
            Route::get('/standings', [StandingController::class, 'index']);
            Route::post('/standings', [StandingController::class, 'store']);
            Route::put('/standings/{id}', [StandingController::class, 'update']);
            Route::delete('/standings/{id}', [StandingController::class, 'destroy']);
        });
        
        Route::prefix('user')->group(function () {
            Route::get('/users', [UserController::class, 'index']);
            Route::post('/users', [UserController::class, 'store']);
            Route::put('/users/{id}', [UserController::class, 'update']);
            Route::delete('/users/{id}', [UserController::class, 'destroy']);
        });
    });
    
