<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 *
 * @mixin Builder
 *
 * @package App
 */
class User extends Eloquent implements AuthenticatableContract, JWTSubject
{
    use AuthenticableTrait;

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
        'reset_token_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'reset_token'
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
        'reset_token_at'
    ];

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
}
