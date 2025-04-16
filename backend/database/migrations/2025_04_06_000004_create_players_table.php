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
            $table->enum('position', ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD']);
            $table->date('birthDate');
            $table->string('nationality');
            $table->string('image')->nullable();
            $table->string('teamID');
            $table->foreign('teamID')->references('teamID')->on('teams')->onDelete('cascade');
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
