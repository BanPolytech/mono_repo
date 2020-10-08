<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $module_1 = new \AOSForceMonoRepo\Authentication\Models\Module;
        $module_1->name = "Lead Finder";
        $module_1->save();

        $module_2 = new \AOSForceMonoRepo\Authentication\Models\Module;
        $module_2->name = "Project Manager";
        $module_2->save();

        $module_3 = new \AOSForceMonoRepo\Authentication\Models\Module;
        $module_3->name = "Contractor Manager";
        $module_3->save();

        $module_4 = new \AOSForceMonoRepo\Authentication\Models\Module;
        $module_4->name = "AOS Force";
        $module_4->save();
    }
}
