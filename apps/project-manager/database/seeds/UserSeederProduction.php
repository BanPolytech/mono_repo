<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeederProduction extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $usersManager = [
            ['Fanny Rambert', 'fanny@go-aos.io'],
            ['Charlotte Arnould', 'charlotte@go-aos.io'],
            ['Laura Tramier', 'laura@go-aos.io'],
            ['Juan Medina', 'juan@go-aos.io'],
            ['Thomas Nouet', 'thomas.nouet@go-aos.io'],
            ['Perrine Boitard', 'Perrine@go-aos.io'],
            ['Suzanne Adamczyk', 'Suzanne@go-aos.io'],
            ['Paul Clavière', 'paul@go-aos.io'],
        ];

        $usersSupport = [
            ['Corentin Prioul', 'corentin.prioul@go-aos.io'],
            ['Mariem Mtimet', 'mariem@go-aos.io'],
            ['Huggo Chabaud', 'huggo.chabaud@go-aos.io'],
            ['Salma Slimani', 'salma@go-aos.io'],
            ['Ghita Houssaini', 'ghita@go-aos.io'],
            ['Lolita Amiraly', 'lolita@go-aos.io'],
            ['Chloé Monimart', 'chloe@go-aos.io'],
            ['Marin Raynaud', 'marin@go-aos.io'],
            ['Thomas Suchet', 'thomas.suchet@go-aos.io'],
        ];

        $usersSales = [
            ['Marc Giraudot', 'marc@go-aos.io'],
            ['Thibault Gerard', 'thibault@go-aos.io'],
            ['Cyrille Zanetti', 'cyrille@go-aos.io'],
            ['Corentin Robineau', 'corentin@go-aos.io'],
            ['Baptiste Ponroy', 'baptiste@go-aos.io'],
            ['Yahia Ouafi', 'yahia@go-aos.io'],
            ['Nathan Schaller', 'nathan@go-aos.io'],
        ];

        $manager = \App\Role::where('name', '=', 'manager')->first();
        $support = \App\Role::where('name', '=', 'support')->first();
        $sales = \App\Role::where('name', '=', 'sales')->first();

        foreach ($usersManager as $userManager) {
            $id = DB::table('users')->insertGetId([
                'name' => $userManager[0],
                'email' => $userManager[1],
                'password' => Hash::make('AOSForce%2020%')
            ]);
            \App\User::find($id)->assignRole($manager);
        }

        foreach ($usersSupport as $userSupport) {
            $id = DB::table('users')->insertGetId([
                'name' => $userSupport[0],
                'email' => $userSupport[1],
                'password' => Hash::make('AOSForce%2020%')
            ]);
            \App\User::find($id)->assignRole($support);
        }

        foreach ($usersSales as $userSales) {
            $id = DB::table('users')->insertGetId([
                'name' => $userSales[0],
                'email' => $userSales[1],
                'password' => Hash::make('AOSForce%2020%')
            ]);
            \App\User::find($id)->assignRole($sales);
        }

        DB::table('users')->insertGetId([
            'name' => 'Esteban Gobert',
            'email' => 'esteban@go-aos.io',
            'password' => Hash::make('EstebanAOS%2020%')
        ]);
    }
}
