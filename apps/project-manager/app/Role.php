<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

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

    protected $appends = [
        'users'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function abilities() {
        return $this->belongsToMany(Ability::class)->withTimestamps();
    }

    public function users() {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function allowTo($ability) {
        $this->abilities()->save($ability);
    }

    /*****************
     * GATHERING     *
     *****************/

    public function getUsersAttribute() {
        return $this->users()->pluck('name')->unique();

    }
}
