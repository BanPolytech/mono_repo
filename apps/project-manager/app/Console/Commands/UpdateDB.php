<?php

namespace App\Console\Commands;

use App\Agency;
use App\Client;
use App\Project;
use Illuminate\Console\Command;

class UpdateDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the project collection to extract the framework contracts and put '.
    'the clientName and agency fields into their equivalent models, then remove the fields';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        Project::where('agency', 'exists', 'true')->where('clientName', 'exists', 'true')->cursor()->each(function ($project) {
            $agencyName = $project->getAttributeValue('agency');
            $clientName = $project->getRawOriginal('clientName');
            $isFrameworkContract = $project->getAttributeValue('isFrameworkContract');

            $this->info('Project '
                ."\nAgency Name : ".$agencyName
                ."\nClient name : ".$clientName);

            if ($clientName != '') {
                $client = Client::firstOrCreate(['name' => $clientName],
                    [
                        'name' => $clientName,
                        'projectsOrderedNumber' => 0,
                        'isFrameworkContract' => $isFrameworkContract
                    ]
                );
            } else {
                $client = Client::firstOrCreate(['name' => 'A CHANGER'],
                    [
                        'name' => 'A CHANGER',
                        'projectsOrderedNumber' => 0,
                        'isFrameworkContract' => false
                    ]
                );
            }

            if ($agencyName != '') {
                $client->agencies()->firstOrCreate(['name' => $agencyName],
                    [
                        'name' => $agencyName,
                        'hoursOrdered' => 0,
                    ]
                )->assignProjects([$project]);
            } else {
                $client->agencies()->firstOrCreate(['name' => 'A CHANGER'],
                    [
                        'name' => 'A CHANGER',
                        'hoursOrdered' => 0,
                    ]
                )->assignProjects([$project]);
            }
        });

        Project::where('agency', 'exists', 'true')->unset('agency');
        Project::where('clientName', 'exists', 'true')->unset('clientName');
    }
}
