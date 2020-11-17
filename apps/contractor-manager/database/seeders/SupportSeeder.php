<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SupportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $emailsSupport = ['corentin.prioul@go-aos.io', 'mariem@go-aos.io', 'huggo.chabaud@go-aos.io', 'salma@go-aos.io','ghita@go-aos.io','lolita@go-aos.io','chloe@go-aos.io', 'marin@go-aos.io', 'thomas.suchet@go-aos.io'];

        foreach ($emailsSupport as $emailSupport) {
            $user = \App\Models\User::where('email', '=', $emailSupport)->first();
            $support = new \App\Models\Support;
            $support->assignUser($user);
        }
    }
}
