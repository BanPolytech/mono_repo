<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

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

    public function roles() {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }
}
