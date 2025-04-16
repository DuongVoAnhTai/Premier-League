<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStandingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return MYSQLI_DATA_TRUNCATED;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'played' => 'required|integer|min:0',
            'won' => 'required|integer|min:0',
            'draw' => 'required|integer|min:0',
            'lost' => 'required|integer|min:0',
            'goalsFor' => 'required|integer|min:0',
            'goalsAgainst' => 'required|integer|min:0',
            'goalDifference' => 'required|integer',
            'points' => 'required|integer|min:0',
            'form' => 'nullable|string|max:255',
            'teamID' => 'required|exists:teams,teamID',
            'tournamentID' => 'required|exists:tournaments,tournamentID',
        ];
    }
}
