<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'manager',
            'label' => 'Operations Customer Manager',
        ]);

        DB::table('roles')->insert([
            'name' => 'support',
            'label' => 'Operations Support',
        ]);

        DB::table('roles')->insert([
            'name' => 'sales',
            'label' => 'Sales',
        ]);
    }
}
