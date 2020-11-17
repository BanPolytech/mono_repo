<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class User
 *
 * @mixin Builder
 *
 * @package App
 */
class Project extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'projects';

    protected $dates = ['dateStart', 'dateEnd', 'dateNext'];

    protected $guarded = [];

    protected $appends = [
        'opsNames',
        'supportNames',
        'salesName'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function ops() {
        return $this->belongsToMany(Ops::class)->withTimestamps();
    }

    public function supports() {
        return $this->belongsToMany(Support::class)->withTimestamps();
    }

    public function sales() {
        return $this->belongsTo(Sales::class);
    }
    public function projectCompanies() {
        return $this->hasMany(ProjectCompany::class);
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    public function assignSales($sales) {
        $this->sales()->associate($sales)->save();
    }

    public function assignOps($ops) {
        $this->ops()->save($ops);
    }

    public function assignMultiOps($multiOps) {
        $this->ops()->saveMany($multiOps);
    }

    public function assignSupport($support) {
        $this->supports()->save($support);
    }

    public function assignSupports($supports) {
        $this->supports()->saveMany($supports);
    }

    /*****************
     * GATHERING     *
     *****************/

    public function getOpsNamesAttribute() {
        $opsNames = [];
        $allOps = $this->ops->all();
        foreach($allOps as $ops) {
            $opsNames[] = $ops->user()->value('name');
        }
        return $opsNames;
    }

    public function getSupportNamesAttribute() {
        $supportNames = [];
        $allSupport = $this->supports->all();
        foreach($allSupport as $support) {
            $supportNames[] = $support->user()->value('name');
        }
        return $supportNames;
    }

    public function getSalesNameAttribute() {
        return $this->sales()->first()->user()->value('name');
    }

}
