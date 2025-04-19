<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make('1'),
            'name' => $request->name,
            'role' => $request->role,
        ]);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUserRequest $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->update([
            'email' => $request->email,
            // 'password' => $request->password ? Hash::make($request->password) : $user->password,
            'name' => $request->name,
            'role' => $request->role,
        ]);

        return response()->json($user, 200);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'nullable|string',
        ]);

        $user = $request->user();
        $user->name = $request->name;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
