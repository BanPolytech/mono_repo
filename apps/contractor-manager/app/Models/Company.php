<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Company
 *
 * @mixin Builder
 *
 * @package App
 */
class Company extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'companies';

    protected $guarded = [];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function contacts() {
        return $this->hasMany(Contact::class);
    }

    public function projectCompanies() {
        return $this->hasMany(ProjectCompany::class);
    }
}
