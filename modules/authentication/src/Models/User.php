<?php

namespace AOSForceMonoRepo\Authentication\Models;

use Carbon\Carbon;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;
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


    /*****************
     * RELATIONSHIPS *
     *****************/

    public function module_roles()
    {
        return $this->belongsToMany(Module_Role::class, null, 'user_ids', 'module_role_ids')->withTimestamps();
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignModule_Role($module_role)
    {
        $this->module_roles()->save($module_role);
    }

    public function assignModule_Roles($module_roles)
    {
        $this->module_roles()->saveMany($module_roles);
    }

    /*****************
     *  GETTERS  *
     *****************/

    public function isSuperAdmin()
    {
        $superAdminId = Role::where('name', '=', 'Super Admin')->value('_id');
        return $this->module_roles()->where('role_id', $superAdminId)->exists();
    }

    public function isAdminIn($module)
    {
        $adminId = Role::where('name', '=', 'Admin')->value('_id');
        $moduleId = Module::where('name', '=', $module)->value('_id');
        return $this->module_roles()->where('role_id', $adminId)->where('module_id', $moduleId)->exists();
    }

    public function isMemberIn($module)
    {
        $memberId = Role::where('name', '=', 'Utilisateur')->value('_id');
        $moduleId = Module::where('name', '=', $module)->value('_id');
        return $this->module_roles()->where('role_id', $memberId)->where('module_id', $moduleId)->exists();
    }

    /****************
     * AUTH TOKEN   *
     ****************/

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
