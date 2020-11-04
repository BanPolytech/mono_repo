<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Sales
 *
 * @mixin Builder
 *
 * @package App
 */
class Sales extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'sales';

    protected $guarded = [];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function project() {
        return $this->hasMany(Project::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignUser($user) {
        $this->user()->associate($user)->save();
    }


}
