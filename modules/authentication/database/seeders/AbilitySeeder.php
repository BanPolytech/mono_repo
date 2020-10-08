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

        $ability_1 = new \AOSForceMonoRepo\Authentication\Models\Ability;
        $ability_1->name = "access";
        $ability_1->save();

        $ability_2 = new \AOSForceMonoRepo\Authentication\Models\Ability;
        $ability_2->name = "add";
        $ability_2->save();

        $ability_3 = new \AOSForceMonoRepo\Authentication\Models\Ability;
        $ability_3->name = "delete";
        $ability_3->save();

    }
}
