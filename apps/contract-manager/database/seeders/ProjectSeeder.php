<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $project = \App\Models\Project::create([
            'name' => 'Huron',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Stradim',
            'agency' => 'Marseille',
            'responseFormat' => 'Devis',
            'clientExpectations' => "En tant que MOA ils ont pas la main sur les devis. Obligé d'appeler l'archi, avoir une visibilité en tant réel sur les réponses sur prix ",
            'formerWorking' => ' Excel + Wetransfer',
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 7, 14),
            'dateEnd' => Carbon::createFromDate(2020, 9, 21),
            'dateNext' => Carbon::createFromDate(2020, 9, 22),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [
                [
                    'author' => 'Fanny Rambert',
                    'date' => '2020-08-21T10:40:29.377000Z',
                    'message' => "Lot GO et TECHNIQUES lancement semaine prochaine normalement L'ensemble des lots début décembre."
                ],
                [
                    'author' => 'Fanny Rambert',
                    'date' => '2020-08-13T09:45:29.377000Z',
                    'message' => "Centraliser les entreprises, Directeur technique aura un visuel des entreprises"
                ],
            ],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $marc = \App\Models\Sales::first();
        $project->assignSales($marc);
        $fanny = \App\Models\Ops::first();
        $project->assignOps($fanny);
        $laura = \App\Models\User::where('email', 'laura@go-aos.io')->first()->ops;
        $project->assignOps($laura);
        $corentin = \App\Models\Support::first();
        $project->assignSupport($corentin);

        $project2 = \App\Models\Project::create([
            'name' => 'Chalon sur Soane',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Nexity',
            'agency' => 'Lyon',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 8, 10),
            'dateEnd' => Carbon::createFromDate(2020, 10, 10),
            'dateNext' => Carbon::createFromDate(2020, 10, 10),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project2->assignSales($marc);
        $project2->assignOps($laura);
        $project2->assignSupport($corentin);

        $project3 = \App\Models\Project::create([
            'name' => 'Projet Paris',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Icade',
            'agency' => 'Ile de France',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 9, 9),
            'dateEnd' => Carbon::createFromDate(2020, 11, 19),
            'dateNext' => Carbon::createFromDate(2020, 11, 19),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project3->assignSales($marc);
        $charlotte = \App\Models\User::where('email', 'charlotte@go-aos.io')->first()->ops;
        $project3->assignOps($charlotte);
        $ghita = \App\Models\User::where('email', 'ghita@go-aos.io')->first()->support;
        $project3->assignSupport($ghita);

        $project4 = \App\Models\Project::create([
            'name' => 'Projet Toulouse',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Gifi',
            'agency' => 'Toulouse',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 8, 1),
            'dateEnd' => Carbon::createFromDate(2020, 11, 12),
            'dateNext' => Carbon::createFromDate(2020, 11, 12),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project4->assignSales($marc);
        $juan = \App\Models\User::where('email', 'juan@go-aos.io')->first()->ops;
        $project4->assignOps($juan);
        $huggo = \App\Models\User::where('email', 'huggo.chabaud@go-aos.io')->first()->support;
        $project4->assignSupport($huggo);

        $project5 = \App\Models\Project::create([
            'name' => 'Carré Marceau',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Urbat',
            'agency' => 'Montpellier',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 7, 29),
            'dateEnd' => Carbon::createFromDate(2020, 9, 19),
            'dateNext' => Carbon::createFromDate(2020, 9, 19),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project5->assignSales($marc);
        $project5->assignOps($laura);
        $mariem = \App\Models\User::where('email', 'mariem@go-aos.io')->first()->support;
        $project5->assignSupport($mariem);

        $project6 = \App\Models\Project::create([
            'name' => 'Blue Sunset',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Atréalis Promotion',
            'agency' => 'Nantes',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 7, 24),
            'dateEnd' => Carbon::createFromDate(2020, 9, 24),
            'dateNext' => Carbon::createFromDate(2020, 9, 24),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project6->assignSales($marc);
        $project6->assignOps($juan);
        $project6->assignSupport($mariem);

        $project7 = \App\Models\Project::create([
            'name' => 'Projet 2',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => "Lak's Design",
            'agency' => 'Nantes',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 7, 21),
            'dateEnd' => Carbon::createFromDate(2020, 9, 12),
            'dateNext' => Carbon::createFromDate(2020, 9, 12),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project7->assignSales($marc);
        $project7->assignOps($juan);
        $project7->assignSupport($mariem);

        $project8 = \App\Models\Project::create([
            'name' => 'Projet Nantes',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Novastrada',
            'agency' => 'Nantes',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 7, 19),
            'dateEnd' => Carbon::createFromDate(2020, 10, 9),
            'dateNext' => Carbon::createFromDate(2020, 10, 9),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project8->assignSales($marc);
        $project8->assignOps($charlotte);
        $project8->assignSupport($huggo);

        $project9 = \App\Models\Project::create([
            'name' => 'STOCKESPACE "GDQ"',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Alsei 23',
            'agency' => 'La réunion',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 7, 12),
            'dateEnd' => Carbon::createFromDate(2020, 11, 20),
            'dateNext' => Carbon::createFromDate(2020, 11, 20),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project9->assignSales($marc);
        $project9->assignOps($charlotte);
        $project9->assignSupport($corentin);

        $project10 = \App\Models\Project::create([
            'name' => 'Waquet',
            'stage' => 'En cours',
            'isFrameworkContract' => true,
            'clientName' => 'Axis Group',
            'agency' => 'Lille',
            'responseFormat' => 'Devis',
            'clientExpectations' => "Pas d'infos",
            'formerWorking' => "Pas d'infos",
            'canAddCompaniesOnBatch' => true,
            'priorityBatch' => 'Gros oeuvre',
            'batchToCome' => 'Maçonnerie',
            'isOnOpenConsultation' => true,
            'isAddableAutomaticallyOnOP' => true,
            'nextStep' => 'Point mi-projet',
            'companiesNumber' => 450,
            'supportAction' => 'FORMATION',
            'dateStart' => Carbon::createFromDate(2020, 7, 8),
            'dateEnd' => Carbon::createFromDate(2020, 10, 11),
            'dateNext' => Carbon::createFromDate(2020, 10, 11),
            'checklist' => [
                'visio' => true,
                'dpgfReceived' => true,
                'dpgfSent' => true,
                'companiesList' => true,
                'companiesInvited' => false,
                'mvSent' => false,
                'formation50' => false,
                'formation75' => false,
                'formation100' => false,
                'statusHalf' => false,
                'statusEnd' => false,
                'mailSent' => false,
            ],
            'contacts' => [],
            'comments' => [],
            'screenshot' => [
                'uploadDate' => '',
                'format' => '',
                'base64' => '',
            ]
        ]);

        $project10->assignSales($marc);
        $project10->assignOps($charlotte);
        $project10->assignSupport($huggo);

    }
}
