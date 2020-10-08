<?php

namespace AOSForceMonoRepo\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
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
            if(!$request->cookies->has('XSRF-TOKEN')) throw new TokenMismatchException();
//            $rawToken = $_COOKIE['access_token'];
            $rawToken = $request->cookie('access_token');
            $token = new Token($rawToken);
            $payload = JWTAuth::decode($token);
            $user = User::findOrfail($payload->get('sub'));
            auth()->login($user);
        } catch(Exception $e) {
            if($e instanceof TokenExpiredException) {
                // TODO token refresh here
            }
            return response('Unauthorized', 401);
        }

        return $next($request);
    }
}
