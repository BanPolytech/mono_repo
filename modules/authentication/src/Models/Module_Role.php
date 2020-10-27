<?php

namespace AOSForceMonoRepo\Authentication\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;

/**
 * Class Module_Role
 *
 * @mixin Builder
 *
 * @package App
 */
class Module_Role extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'module_role';

    protected $guarded = [];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function users() {
        return $this->belongsToMany(User::class, null, 'module_role_ids', 'user_ids')->withTimestamps();
    }
    public function role() {
        return $this->belongsTo(Role::class);
    }
    public function module() {
        return $this->belongsTo(Module::class);
    }
    public function abilities() {
        return $this->belongsToMany(Ability::class, null, 'module_role_ids', 'ability_ids')->withTimestamps();
    }


    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignUser($user) {
        $this->users()->save($user);
    }

    public function assignUsers($users) {
        $this->users()->saveMany($users);
    }

    public function assignAbility($ability) {
        $this->abilities()->save($ability);
    }

    public function assignAbilities($abilities) {
        $this->abilities()->saveMany($abilities);
    }
}
