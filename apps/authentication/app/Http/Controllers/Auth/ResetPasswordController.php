<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    /**
     * Validate the email of the token sent in the "reset password "request.
     *
     * @param string $email
     * @param string $token
     * @return string|App\User
     */
    protected function validateSession($email, $token)
    {
        $user = User::where('email', $email)->where('reset_token', $token)->first();

        if (!$user) {
            return trans('passwords.user');
        }

        if ($user->reset_token_at->diffInHours(now()) > 24) {
            $user->deleteResetPassword();
            return trans('password.request_expired');
        }

        return $user;
    }

    /**
     * Get an error if the request is not valid (yet) 
     * or get the first name of the user.
     *
     * @param string $email
     * @param string $token
     * @return array
     */
    public function showResetData($email, $token)
    {
        $user = $this->validateSession($email, $token);

        if ($user instanceof User === false) {
            return ['error' => $user];
        }

        return ['success' => true, 'first_name' => $user->name];
    }

    /**
     * Reset the password of an user if the request has been validated.
     *
     * @param string $email
     * @param string $token
     * @return array
     */
    public function reset($email, $token)
    {
        $user = $this->validateSession($email, $token);

        if ($user instanceof User) {
            request()->validate([
                'password' => 'required|confirmed',
                'password_confirmation' => 'required'
            ]);

            $user->update(['password' => bcrypt(request('password'))]);
            $user->deleteResetPassword();

            return ['success' => trans('passwords.password_edited')];
        }

        return ['error' => $user];
    }
}
