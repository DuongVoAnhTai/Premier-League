<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGoalRequest extends FormRequest
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
            'minute' => 'required|integer|min:1|max:120',
            'ownGoal' => 'nullable|boolean',
            'isPenalty' => 'nullable|boolean',
            'matchID' => 'required|exists:matches,matchID',
            'scoredBy' => 'required|exists:players,playerID',
        ];
    }
}
