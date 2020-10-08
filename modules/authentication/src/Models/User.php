<?php

namespace AOSForceMonoRepo\Authentication\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
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
        'password'
    ];


    /*****************
     * RELATIONSHIPS *
     *****************/

    public function module_roles() {
        return $this->belongsToMany(Module_Role::class, null, 'user_ids', 'module_role_ids')->withTimestamps();
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignModule_Role($module_role) {
        $this->module_roles()->save($module_role);
    }

    public function assignModule_Roles($module_roles) {
        $this->module_roles()->saveMany($module_roles);
    }

    /*****************
     *  GETTERS  *
     *****************/

    public function isSuperAdmin() {
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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}
