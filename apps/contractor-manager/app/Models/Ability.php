<?php

namespace App\Models;

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

    public function module_role() {
        return $this->belongsTo(Module_Role::class);
    }


}
