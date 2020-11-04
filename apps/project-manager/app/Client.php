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
class Client extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'clients';

    protected $fillable = [
        'name',
        'projectsOrderedNumber',
        'isFrameworkContract',
    ];

    protected $attributes = [
        'projectsOrderedNumber' => 0,
    ];

    protected $appends = [
        'agenciesNumber',
        'projectsStock'
    ];

    protected $casts = [
        'projectsOrderedNumber' => 'integer'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function agencies()
    {
        return $this->hasMany(Agency::class);
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignAgencies($agencies)
    {
        $this->agencies()->saveMany($agencies);
    }

    /*****************
     * GATHERING     *
     *****************/

    public function getAgenciesNumberAttribute()
    {
        return $this->agencies()->count();
    }

    public function getProjectsStockAttribute()
    {
        $projectsNumberSum = $this->agencies()->get()->sum('projectsNumber');
        return $projectsNumberSum . '/' . $this->projectsOrderedNumber;
    }
}
