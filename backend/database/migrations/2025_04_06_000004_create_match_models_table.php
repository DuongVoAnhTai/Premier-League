<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->string('matchID')->primary();
            $table->string('team1ID');
            $table->string('team2ID');
            $table->date('matchDate');
            $table->string('scheduleID');
            $table->foreign('team1ID')->references('teamID')->on('teams')->onDelete('cascade');
            $table->foreign('team2ID')->references('teamID')->on('teams')->onDelete('cascade');
            $table->foreign('scheduleID')->references('scheduleID')->on('schedules')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
