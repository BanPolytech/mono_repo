<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Builder;
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

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function projects() {
        return $this->hasMany(Project::class);
    }

    public function contacts() {
        return $this->hasMany(Contact::class);
    }

    public function roles() {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignRole($role) {
        $this->roles()->save($role);
    }

    /*****************
     * GATHERING     *
     *****************/

    public function abilities() {
        return $this->roles->map->abilities->flatten()->pluck('name')->unique();

    }
}
