<?php

namespace AOSForceMonoRepo\Authentication\Traits;

use Carbon\Carbon;

trait UserAccess
{

    /**
     * Refresh the access_token of the user for 60 minutes more (if it expires in less than 15 min)
     *
     * @return void
     */
    public function refreshAccessToken()
    {
        $date = Carbon::createFromTimestamp(auth()->payload()['exp']);

        if ($date->diffInMinutes() < 10) {
            $token = auth()->refresh();
            self::setAccessTokenCookie($token);
        }
    }

    /**
     * Delete the access_token cookie.
     *
     * @return void
     */
    public function deleteAccessTokenCookie()
    {
        self::setAccessTokenCookie(null, -1);
    }

    /**
     * Set the access_token cookie in the browser.
     *
     * @param string $token
     * @return void
     */
    public static function setAccessTokenCookie($token, $time = null)
    {
        $time = $time ?? auth()->factory()->getTTL() * 60;

        setcookie('access_token', $token, time() + $time, '/', env('APP_SUB_DOMAIN', 'aosforce.com'), true);
    }
}
