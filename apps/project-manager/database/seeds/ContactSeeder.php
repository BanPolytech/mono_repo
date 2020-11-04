<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('contacts')->insert([
            'firstname' => 'Bixente',
            'lastname' => 'Lizarazu',
            'company' => 'Stradim',
            'agency' => 'Marseille',
            'position' => 'Directeur Technique',
            'role' => "Analyse l'appel d'offres",
            'phone' => '0663982220',
            'mail' => 'bixente.lizarazu@stradim.com',
            'notes' => "A envie de lancer un nouveau projet à Aix-en-Provence",
            'projects' => [],
        ]);

        DB::table('contacts')->insert([
            'firstname' => 'Laurent',
            'lastname' => 'Blanc',
            'company' => 'Icade',
            'agency' => 'Nantes',
            'position' => 'Respo Soirée',
            'role' => "Analyse l'appel d'offres",
            'phone' => '0612234556',
            'mail' => 'laurent.blanc@icade.com',
            'notes' => "A envie de tester la longueur de la chaine de caractère pour voir si elle casse pas le pano, YA PAS DE PANOOO",
            'projects' => [],
        ]);
    }
}
