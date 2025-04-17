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
        // Validate dữ liệu đầu vào
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Tìm user theo email
        $user = User::where('email', $request->email)->first();

        // Kiểm tra user tồn tại và mật khẩu đúng
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }

        // Tạo token (dùng Laravel Sanctum)
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ], 200);
    }

    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'Logged out successfully',
            ], 200);
        }

        return response()->json([
            'message' => 'No authenticated user found',
        ], 401);
    }

    public function getCurrentUser(Request $request)
    {
        return response()->json($request->user());
    }
}
