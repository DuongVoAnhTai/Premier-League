<?php 

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        if ($request->user() && $request->user()->role->name === $role) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }
}