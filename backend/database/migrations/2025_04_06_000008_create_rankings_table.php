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
        Schema::create('rankings', function (Blueprint $table) {
            $table->string('rankingID')->primary();
            $table->string('teamID');
            $table->integer('points');
            $table->integer('rank');
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
