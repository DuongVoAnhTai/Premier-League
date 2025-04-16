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
        Schema::create('goals', function (Blueprint $table) {
            $table->string('goalID')->primary();
            $table->integer('minute');
            $table->boolean('ownGoal')->default(false);
            $table->boolean('isPenalty')->default(false);
            $table->string('matchID');
            $table->string('scoredBy');
            $table->foreign('matchID')->references('matchID')->on('matches')->onDelete('cascade');
            $table->foreign('scoredBy')->references('playerID')->on('players')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
