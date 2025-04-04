<?php

use App\Http\Controllers\TournamentController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\RankingController;
use Illuminate\Support\Facades\Route;


    Route::resources([
        'tournaments'=> TournamentController::class,
        'teams'=> TeamController::class,
        'matches' => MatchController::class,
        'rankings' => RankingController::class,
    ]);
