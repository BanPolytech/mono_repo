<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Builder;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

/**
 * Class Project
 *
 * @mixin Builder
 *
 * @package App
 */
class Project extends Eloquent
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'projects';

    protected $fillable = [
        'name',
        'stage',
        'isFrameworkContract',
        'clientName',
        'responseFormat',
        'clientExpectations',
        'formerWorking',
        'canAddCompaniesOnBatch',
        'priorityBatch',
        'batchToCome',
        'isOnOpenConsultation',
        'isAddableAutomaticallyOnOP',
        'nextStep',
        'companiesNumber',
        'supportAction',
        'userSales',
        'userCustomerManager',
        'userSupport',
        'dateStart',
        'dateEnd',
        'dateNext',
        'checklist',
        'contacts',
        'comments',
        'screenshot',
        'hours'
    ];

    protected $casts = [
        'companiesNumber' => 'integer'
    ];

    protected $appends = [
        'agency_name',
        'client_name',
        'contact_tags',
        'hours_done'
    ];

    /*****************
     * RELATIONSHIPS *
     *****************/

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function agency() {
        return $this->belongsTo(Agency::class);
    }

    public function contacts() {
        return $this->belongsToMany(Contact::class)->withTimestamps();
    }

    /*****************
     * ASSIGNMENTS   *
     *****************/

    /**
     * @param  array  $contacts
     */
    public function assignContacts(array $contacts) {
        $this->contacts()->saveMany($contacts);
    }

    /*****************
     * GATHERING     *
     *****************/

    /**
     * @return string
     */
    public function getAgencyNameAttribute()
    {
        return optional($this->agency)->name;
    }

    /**
     * @return string
     */
    public function getClientNameAttribute()
    {
        return optional(optional($this->agency)->client)->name;
    }

    /**
     * @return array
     */
    public function getContactTagsAttribute()
    {
        $contacts = $this->contacts()->get();
        $tags = [];

        foreach ($contacts as $contact) {
            $tags[] = [
                '_id' => $contact->_id,
                'label' => $contact->fullName,
            ];
        }

        return $tags;
    }

    /**
     * @return int
     */
    public function getHoursDoneAttribute()
    {
        $hours = $this->hours;
        $hoursDone = 0;
        if ($hours) {
            foreach ($hours as $hour) {
                $hoursDone += intval($hour);
            }
        }

        return $hoursDone;
    }
}
