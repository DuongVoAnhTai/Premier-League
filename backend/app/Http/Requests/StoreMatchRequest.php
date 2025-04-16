<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'matchDate' => 'required|date',
            'time' => 'required|string',
            'status' => 'required|in:LIVE,FINISHED,CANCELLED',
            'homeScore' => 'nullable|integer|min:0',
            'awayScore' => 'nullable|integer|min:0',
            'tournamentID' => 'required|exists:tournaments,tournamentID',
            'homeTeamID' => 'required|exists:teams,teamID',
            'awayTeamID' => 'required|exists:teams,teamID|different:homeTeamID',
        ];
    }
}
