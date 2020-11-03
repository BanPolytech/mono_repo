<?php

namespace App;

use AOSForceMonoRepo\Authentication\Traits\UserAccess;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

/**
 * Class User
 *
 * @mixin Builder
 *
 * @package App
 */
class User extends Eloquent implements AuthenticatableContract, JWTSubject
{
    use AuthenticableTrait, UserAccess;

    /**
     * The connection used to open the database.
     *
     * @var string
     */
    protected $connection = 'mongodb';

    /**
     * The collection name.
     *
     * @var string
     */
    protected $collection = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'reset_token',
        'reset_token_at',
        'invitation_token',
        'invitation_token_at',
        'invitation_token_by'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'reset_token', 'invitation_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime'
    ];


    /**
     * The attributes that should cast to native MongoDB dates.
     *
     * @var array
     */
    protected $dates = [
        'reset_token_at',
        'invitation_token_at',
    ];

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
     * Get the current JWT key.
     *
     * @return string
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Get the custom JWT claims.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
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
