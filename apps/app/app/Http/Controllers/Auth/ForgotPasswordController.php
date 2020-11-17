<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Mail\Auth\SendResetLink;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    /**
     * Send a link by email to the user.
     *
     * @return array
     */
    public function sendResetLinkEmail()
    {
        request()->validate(['email' => 'required|email']);

        $user = User::where('email', request('email'))->first();

        if (!$user) {
            return ['error' => trans('passwords.user')];
        }

        $user->update([
            'reset_token' => Str::random(90),
            'reset_token_at' => now()
        ]);

        Mail::to($user->email)->send(new SendResetLink($user));

        return ['success' => trans('passwords.sent')];
    }
}
