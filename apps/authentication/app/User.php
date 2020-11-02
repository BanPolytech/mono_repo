<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 *
 * @mixin Builder
 *
 * @package App
 */
class User extends Eloquent implements AuthenticatableContract, CanResetPasswordContract, JWTSubject
{
    use AuthenticableTrait;
    use Notifiable;
    use CanResetPassword;

    protected $connection = 'mongodb';
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
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /*****************
     * RELATIONSHIPS *
     *****************/

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignRole($role)
    {
        $this->roles()->save($role);
    }

    /*****************
     * GATHERING     *
     *****************/

    public function abilities()
    {
        return $this->roles->map->abilities->flatten()->pluck('name')->unique();
    }

    /****************
     * AUTH TOKEN   *
     ****************/

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
