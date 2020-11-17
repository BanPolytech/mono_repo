<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SalesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $emailsSales = ['marc@go-aos.io', 'thibault@go-aos.io', 'cyrille@go-aos.io', 'corentin@go-aos.io', 'baptiste@go-aos.io', 'yahia@go-aos.io', 'nathan@go-aos.io'];

        foreach ($emailsSales as $emailSales) {
            $user = \App\Models\User::where('email', '=', $emailSales)->first();
            $sales = new \App\Models\Sales;
            $sales->assignUser($user);
        }

    }
}
