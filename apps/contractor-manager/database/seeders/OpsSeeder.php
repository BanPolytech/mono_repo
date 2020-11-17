<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OpsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $emailsOps = ['fanny@go-aos.io', 'charlotte@go-aos.io', 'laura@go-aos.io', 'juan@go-aos.io','thomas.nouet@go-aos.io','Perrine@go-aos.io','Suzanne@go-aos.io', 'paul@go-aos.io'];

        foreach ($emailsOps as $emailOps) {
            $user = \App\Models\User::where('email', '=', $emailOps)->first();
            $ops = new \App\Models\Ops;
            $ops->assignUser($user);
        }
    }
}
