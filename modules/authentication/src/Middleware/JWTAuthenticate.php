<?php

namespace AOSForceMonoRepo\Authentication\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
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
        // caching the next action
        $response = $next($request);

        try {
            if (!$request->cookies->has('XSRF-TOKEN')) throw new TokenMismatchException();
//            $rawToken = $_COOKIE['access_token'];
            $rawToken = $request->cookie('access_token');
            $token = new Token($rawToken);
            $payload = JWTAuth::decode($token);
            $user = User::findOrfail($payload->get('sub'));
            auth()->login($user);
        } catch (Exception $e) {
            if ($e instanceof TokenExpiredException) {
                // If the token is expired, then it will be refreshed and added to the headers
                try {
                    $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                    $user = JWTAuth::setToken($refreshed)->toUser();
                    // TODO : set cookie with refreshed token
                    auth()->login($user);
                } catch (JWTException $e) {
                    return response()->json([
                        'code' => 103, // means not refreshable
                        'response' => null // nothing to show
                    ]);
                }
            } else {
                return response('Unauthorized', 401);
            }
        }

        return $next($request);
    }
}
