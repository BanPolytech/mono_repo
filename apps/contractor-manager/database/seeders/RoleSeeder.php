<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['Super Admin', 'Admin', 'Member'];

        foreach ($roles as $role) {
            \App\Models\Role::create(['name' => $role]);
        }

    }
}
