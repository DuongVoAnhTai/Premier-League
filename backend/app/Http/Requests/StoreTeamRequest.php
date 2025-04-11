<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest
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
            'teamID' => 'required|string|unique:teams',
            'name' => 'required|string',
            'coach' => 'required|string',
            'points' => 'integer|default:0',
            'logo' => 'nullable|string',
            'tournamentID' => 'required|string|exists:tournaments,tournamentID',
        ];
    }
}
