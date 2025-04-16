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
            $table->date('matchDate');
            $table->string('time');
            $table->enum('status', ['LIVE', 'FINISHED', 'CANCELLED']);
            $table->integer('homeScore')->default(0);
            $table->integer('awayScore')->default(0);
            $table->string('tournamentID');
            $table->string('homeTeamID');
            $table->string('awayTeamID');
            $table->foreign('tournamentID')->references('tournamentID')->on('tournaments')->onDelete('cascade');
            $table->foreign('homeTeamID')->references('teamID')->on('teams')->onDelete('cascade');
            $table->foreign('awayTeamID')->references('teamID')->on('teams')->onDelete('cascade');
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
