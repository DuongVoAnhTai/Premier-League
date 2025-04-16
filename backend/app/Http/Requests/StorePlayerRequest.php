<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlayerRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'position' => 'required|in:GOALKEEPER,DEFENDER,MIDFIELDER,FORWARD',
            'birthDate' => 'nullable|date',
            'nationality' => 'required|string|max:255',
            'image' => 'nullable|string|max:255',
            'teamID' => 'required|exists:teams,teamID',
        ];
    }
}
