<?php

namespace AOSForceMonoRepo\Authentication\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;

/**
 * Class Ability
 *
 * @mixin Builder
 *
 * @package App
 */
class Ability extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'abilities';

    protected $guarded = [];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function module_roles() {
        return $this->belongsToMany(Module_Role::class, null, 'ability_ids', 'module_role_ids')->withTimestamps();
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
}
