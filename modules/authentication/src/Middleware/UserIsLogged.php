<?php

namespace AOSForceMonoRepo\Authentication\Middleware;

use Closure;

class UserIsAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		dump('Hello there, I am in the Middleware');
		
        return $next($request);
    }
}
