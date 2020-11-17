<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Module
 *
 * @mixin Builder
 *
 * @package App
 */
class Module extends Eloquent
{

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
