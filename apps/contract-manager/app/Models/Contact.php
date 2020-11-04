<?php

namespace App\Models;

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
    protected $connection = 'mongodb';
    protected $collection = 'contacts';

    protected $guarded = [];


    /*****************
     * RELATIONSHIPS *
     *****************/

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function projectCompanies() {
        return $this->hasMany(ProjectCompany::class);
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignCompany($company) {
        $this->company()->associate($company)->save();
    }

}
