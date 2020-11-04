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
        $modules = ['Lead Finder', 'Project Manager', 'Contractor Manager', 'AOS Force'];

        foreach ($modules as $module) {
            \App\Models\Module::create(['name' => $module]);
        }

    }
}
