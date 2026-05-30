<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileIsComplete
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        $isCompleteProfileRoute = $request->routeIs(
            'complete-profile.edit',
            'complete-profile.update',
        );

        if ($user->phone && $user->birthdate && $user->gender && $user->birthplace && $user->address) {
            if ($isCompleteProfileRoute) {
                return redirect()->route('dashboard');
            }

            return $next($request);
        }

        if ($isCompleteProfileRoute || $request->routeIs('logout')) {
            return $next($request);
        }

        return redirect()->route('complete-profile.edit');
    }
}
