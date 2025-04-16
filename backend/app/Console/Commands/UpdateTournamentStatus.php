<?php

namespace App\Console\Commands;

use App\Models\Tournament;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdateTournamentStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tournaments:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the status of tournaments based on startDate and endDate';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("CRON Job running");
        $tournaments = Tournament::all();

        foreach ($tournaments as $tournament) {
            $currentDate = Carbon::now();
            $startDate = Carbon::parse($tournament->startDate);
            $endDate = $tournament->endDate ? Carbon::parse($tournament->endDate) : null;

            if ($endDate && $currentDate->gt($endDate)) {
                $tournament->status = 'finished';
            } elseif ($currentDate->between($startDate, $endDate ?? $currentDate)) {
                $tournament->status = 'ongoing';
            } else {
                $tournament->status = 'upcoming';
            }

            $tournament->save();
        }

        $this->info('Tournament statuses updated successfully!');
    }
}
