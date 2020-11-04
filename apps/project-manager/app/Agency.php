<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Client
 *
 * @mixin Builder
 *
 * @package App
 */
class Agency extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'agencies';

    protected $fillable = [
        'name',
        'hoursOrdered',
    ];

    protected $appends = [
        'hoursStock',
        'projects_hoursDone',
        'projectsNumber',
        'projectsOverStages',
    ];

    protected $attributes = [
        'hoursOrdered' => 0
    ];

    protected $casts = [
        'hoursOrdered' => 'integer'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignProjects($projects)
    {
        $this->projects()->saveMany($projects);
    }

    /*****************
     * GATHERING     *
     *****************/

    public function getProjectsHoursDoneAttribute()
    {
        return $this->projects()->get()->sum('hours_done');
    }

    public function getProjectsNumberAttribute()
    {
        return $this->projects()->count();
    }

    public function getHoursStockAttribute()
    {
        return $this->getProjectsHoursDoneAttribute() . '/' . $this->hoursOrdered;
    }

    public function getProjectsOverStagesAttribute()
    {
        return $this->projects()->get(['stage'])->countBy('stage')->all();

        /*$ids = $this->projects()->pluck('_id')->toArray();

        return $this->projects()->raw(function ($collection) use ($ids) {
            return $collection->aggregate([
                    [
                        '$match' => [
                            '_id' => ['$in' => $ids]
                        ]
                    ],
                    [
                        '$group' => [
                            '_id' => 'stage',
                            'count' => ['$sum' => 1]
                        ]
                    ]
                ]
            );
        });*/
    }
}
