<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProjectCompany;
use App\Models\Contact;
use App\Models\Company;
use App\Models\Project;

class ProjectCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projectCompanies = [
            ['30', 'CLOISONEMENT - PLATRERIE'],
            ['50', 'PEINTURE'],
            ['50', 'PEINTURE']
        ];

        $contacts = [
            'empi.contact.pro@gmail.com',
            'epn@9business.fr',
            'emp.lagarde@wanadoo.fr'
        ];

        $enterprises = [
            'EMPI',
            'EPN - ETANCHEITE PEINTURE NETTOYAGE',
            'EMP'
        ];

        $theProject = Project::first();

        foreach ($projectCompanies as $key=>$projectCompany) {
            $theProjectCompany = ProjectCompany::create([
                'batchNumber' => $projectCompany[0],
                'batchName' => $projectCompany[1]
            ]);
            $theContact = Contact::where('email', $contacts[$key])->first();
            $theProjectCompany->assignContact($theContact);
            $theCompany = Company::where('name', $enterprises[$key])->first();
            $theProjectCompany->assignCompany($theCompany);
            $theProjectCompany->assignProject($theProject);
        }
    }
}
