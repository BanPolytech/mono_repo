<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $usersOps = [
        //     ['Fanny Rambert', 'fanny@go-aos.io'],
        //     ['Charlotte Arnould', 'charlotte@go-aos.io'],
        //     ['Laura Tramier', 'laura@go-aos.io'],
        //     ['Juan Medina', 'juan@go-aos.io'],
        //     ['Thomas Nouet', 'thomas.nouet@go-aos.io'],
        //     ['Perrine Boitard', 'Perrine@go-aos.io'],
        //     ['Suzanne Adamczyk', 'Suzanne@go-aos.io'],
        //     ['Paul Clavière', 'paul@go-aos.io'],
        // ];

        // $usersSupport = [
        //     ['Corentin Prioul', 'corentin.prioul@go-aos.io'],
        //     ['Mariem Mtimet', 'mariem@go-aos.io'],
        //     ['Huggo Chabaud', 'huggo.chabaud@go-aos.io'],
        //     ['Salma Slimani', 'salma@go-aos.io'],
        //     ['Ghita Houssaini', 'ghita@go-aos.io'],
        //     ['Lolita Amiraly', 'lolita@go-aos.io'],
        //     ['Chloé Monimart', 'chloe@go-aos.io'],
        //     ['Marin Raynaud', 'marin@go-aos.io'],
        //     ['Thomas Suchet', 'thomas.suchet@go-aos.io'],
        // ];

        // $usersSales = [
        //     ['Marc Giraudot', 'marc@go-aos.io'],
        //     ['Thibault Gerard', 'thibault@go-aos.io'],
        //     ['Cyrille Zanetti', 'cyrille@go-aos.io'],
        //     ['Corentin Robineau', 'corentin@go-aos.io'],
        //     ['Baptiste Ponroy', 'baptiste@go-aos.io'],
        //     ['Yahia Ouafi', 'yahia@go-aos.io'],
        //     ['Nathan Schaller', 'nathan@go-aos.io'],
        // ];

        // $usersGrowth = [
        //     ['Guillaume Péchon', 'guillaume@go-aos.io'],
        //     ['Esteban Gobert', 'esteban@go-aos.io'],
        //     ['Kevin Rietsch', 'kevin@go-aos.io'],
        //     ['Cyril Besseyre', 'cyril.besseyre@go-aos.io'],
        //     ['Elsa Ducrotverdun', 'elsa@go-aos.io'],
        //     ["Idriss Ben M'rad", 'idriss@go-aos.io'],
        //     ['Louis Sartoris', 'louis@go-aos.io']
        // ];


        $usersInfo = [
            ['Guillaume Péchon', 'guillaume@go-aos.io'],
            ['Esteban Gobert', 'esteban@go-aos.io'],
            ['Kevin Rietsch', 'kevin@go-aos.io'],
            ['Cyril Besseyre', 'cyril.besseyre@go-aos.io'],
            ['Fanny Rambert', 'fanny@go-aos.io'],
            ['Charlotte Arnould', 'charlotte@go-aos.io'],
            ['Laura Tramier', 'laura@go-aos.io'],
            ['Juan Medina', 'juan@go-aos.io'],
            ['Thomas Nouet', 'thomas.nouet@go-aos.io'],
            ['Perrine Boitard', 'Perrine@go-aos.io'],
            ['Suzanne Adamczyk', 'Suzanne@go-aos.io'],
            ['Paul Clavière', 'paul@go-aos.io'],
            ['Corentin Prioul', 'corentin.prioul@go-aos.io'],
            ['Mariem Mtimet', 'mariem@go-aos.io'],
            ['Huggo Chabaud', 'huggo.chabaud@go-aos.io'],
            ['Salma Slimani', 'salma@go-aos.io'],
            ['Ghita Houssaini', 'ghita@go-aos.io'],
            ['Lolita Amiraly', 'lolita@go-aos.io'],
            ['Chloé Monimart', 'chloe@go-aos.io'],
            ['Marin Raynaud', 'marin@go-aos.io'],
            ['Thomas Suchet', 'thomas.suchet@go-aos.io'],
            ['Marc Giraudot', 'marc@go-aos.io'],
            ['Thibault Gerard', 'thibault@go-aos.io'],
            ['Cyrille Zanetti', 'cyrille@go-aos.io'],
            ['Corentin Robineau', 'corentin@go-aos.io'],
            ['Baptiste Ponroy', 'baptiste@go-aos.io'],
            ['Yahia Ouafi', 'yahia@go-aos.io'],
            ['Nathan Schaller', 'nathan@go-aos.io']
        ];


        foreach ($usersInfo as $userInfo) {
            $user = new \App\Models\User;
            $user->name = $userInfo[0];
            $user->email = $userInfo[1];
            $user->password = password_hash("AOSForce%2020%", PASSWORD_DEFAULT);
            $user->save();
        }

    }
}
