<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class ProjectCompany
 *
 * @mixin Builder
 *
 * @package App
 */
class ProjectCompany extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'projectCompanies';

    protected $guarded = [];

    protected $appends = [
        'contact',
        'company'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function contact() {
        return $this->belongsTo(Contact::class);
    }

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignContact($contact) {
        $this->contact()->associate($contact)->save();
    }

    public function assignCompany($company) {
        $this->company()->associate($company)->save();
    }

    public function assignProject($project) {
        $this->project()->associate($project)->save();
    }

    /*****************
     * GATHERING     *
     *****************/

    public function getContactAttribute() {
        return $this->contact()->first();
    }

    public function getCompanyAttribute() {
        return $this->company()->first();
    }

}
