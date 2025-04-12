<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'displayName' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'roleID' => 'required|exists:roles,roleID',
        ]);

        $user = User::create([
            'accountID' => Uuid::uuid4()->toString(),
            'username' => $request->username,
            'displayName' => $request->displayName,
            'password' => Hash::make($request->password),
            'roleID' => $request->roleID,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'username' => 'required|string|',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('username', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
