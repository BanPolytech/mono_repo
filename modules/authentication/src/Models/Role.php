<?php

namespace AOSForceMonoRepo\Authentication\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;

/**
 * Class Role
 *
 * @mixin Builder
 *
 * @package App
 */
class Role extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'roles';

    protected $guarded = [];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function module_roles() {
        return $this->hasMany(Module_Role::class);
    }

}
