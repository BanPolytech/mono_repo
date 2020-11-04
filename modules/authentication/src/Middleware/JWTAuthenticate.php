<?php

namespace AOSForceMonoRepo\Authentication\Middleware;

use AOSForceMonoRepo\Authentication\Facades\Constants;
use AOSForceMonoRepo\Authentication\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;

class JWTAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Decode the token
            $token = new Token($_COOKIE['access_token']);
            $payload = JWTAuth::decode($token);

            // Get the user from the token decoded.
            $user = User::findOrfail($payload->get('sub'));
            auth()->login($user);

            $user->refreshAccessToken($payload);
            return $next($request);
        } catch (Exception $e) {
        }

        return $this->redirectUser($request);
    }

    /**
     * Redirect the user or returns a JSON if the authentication failed.
     *
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    protected function redirectUser($request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'code' => Constants::DISCONNECTED
            ]);
        }

        return redirect(env('URL_AUTHENTICATION_PORTAL', 'https://account.aosforce.com/'));
    }
}
