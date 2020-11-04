<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Ops
 *
 * @mixin Builder
 *
 * @package App
 */
class Ops extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'ops';

    protected $guarded = [];

    protected $appends = [
        'user'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function projects() {
        return $this->belongsToMany(Project::class)->withTimestamps();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignProject($project) {
        $this->projects()->save($project);
    }

    public function assignProjects($projects) {
        $this->projects()->saveMany($projects);
    }

    public function assignUser($user) {
        $this->user()->associate($user)->save();
    }

    /*****************
     * GATHERING     *
     *****************/

    public function getUserAttribute() {
        return $this->user()->value('name');

    }

}
