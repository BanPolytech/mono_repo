<?php

namespace App;

use Illuminate\Support\Str;
use AOSForceMonoRepo\Authentication\Models\User as AOSForceUser;

/**
 * Class User
 *
 * @mixin Builder
 *
 * @package App
 */
class User extends AOSForceUser
{
    /**
     * Get the user who sent the invitation.
     *
     * @return this
     */
    public function sentBy()
    {
        return self::find($this->invitation_token_by);
    }

    /**
     * Delete field for password resetting.
     *
     * @return void
     */
    public function deleteResetPassword()
    {
        $this->unset('reset_token');
        $this->unset('reset_token_at');
    }


    /**
     * Create an invitation for a new user if there is not yet somebody with this email.
     *
     * @param string $email
     * @return boolean|this
     */
    public static function createInvitation($email)
    {
        if (self::where('email', $email)->count() > 0) {
            return false;
        }

        return self::create([
            'email' => $email,
            'invitation_token' => Str::random(90),
            'invitation_token_at' => now()
        ]);
    }
}
