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
        Schema::create('standings', function (Blueprint $table) {
            $table->string('standingID')->primary();
            $table->integer('played')->default(0);
            $table->integer('won')->default(0);
            $table->integer('draw')->default(0);
            $table->integer('lost')->default(0);
            $table->integer('goalsFor')->default(0);
            $table->integer('goalsAgainst')->default(0);
            $table->integer('goalDifference')->default(0);
            $table->integer('points')->default(0);
            $table->string('form')->nullable();
            $table->string('teamID');
            $table->string('tournamentID');
            $table->foreign('teamID')->references('teamID')->on('teams')->onDelete('cascade');
            $table->foreign('tournamentID')->references('tournamentID')->on('tournaments')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rankings');
    }
};
