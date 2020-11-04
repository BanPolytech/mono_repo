<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Contact
 *
 * @mixin Builder
 *
 * @package App
 */
class Contact extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'contacts';

    protected $fillable = [
        'firstname',
        'lastname',
        'company',
        'agency',
        'position',
        'role',
        'phone',
        'mail',
        'notes',
    ];

    protected $appends = [
        'fullName',
        'project_tags'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function projects() {
        return $this->belongsToMany(Project::class)->withTimestamps();
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignProjects($projects) {
        $this->projects()->saveMany($projects);
    }

    /*****************
     * GATHERING     *
     *****************/

    public function getFullNameAttribute()
    {
        return "{$this->firstname} {$this->lastname}";
    }

    public function getProjectTagsAttribute()
    {
        $projects = $this->projects()->get();
        $tags = [];

        foreach ($projects as $project) {
            $tags[] = [
                '_id' => $project->_id,
                'label' => $project->name,
            ];
        }

        return $tags;
    }
}
