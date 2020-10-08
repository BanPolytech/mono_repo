<?php

namespace AOSForceMonoRepo\Authentication\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;

/**
 * Class Module
 *
 * @mixin Builder
 *
 * @package App
 */
class Module extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'modules';

    protected $guarded = [];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function module_roles() {
        return $this->hasMany(Module_Role::class);
    }
}
