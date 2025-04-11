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
        Schema::create('players', function (Blueprint $table) {
            $table->string('playerID')->primary();
            $table->string('name');
            $table->string('teamID');
            $table->string('positionID');
            $table->foreign('teamID')->references('teamID')->on('teams')->onDelete('cascade');
            $table->foreign('positionID')->references('positionID')->on('positions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
