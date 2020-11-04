<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Task
 *
 * @mixin Builder
 *
 * @package App
 */
class Task extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'dateEnd', 'isDone'];
}
