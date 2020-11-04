<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AbilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $abilities = ['access', 'add', 'delete'];

        foreach ($abilities as $ability) {
            \App\Models\Ability::create(['name' => $ability]);
        }

    }
}
