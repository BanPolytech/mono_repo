<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\UTCDateTime;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert([
            'name' => 'Huron',
            'stage' => 'En cours',
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
            'userSales' => 'Jack',
            'userCustomerManager' => 'Jean',
            'userSupport' => ['Paul'],
            'dateStart' => '2020-07-14',
            'dateEnd' => '2020-09-21',
            'dateNext' => '2020-09-22',
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
    }
}
