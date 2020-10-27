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

        $role_1 = new \AOSForceMonoRepo\Authentication\Models\Role;
        $role_1->name = "Super Admin";
        $role_1->save();

        $role_2 = new \AOSForceMonoRepo\Authentication\Models\Role;
        $role_2->name = "Admin";
        $role_2->save();

        $role_3 = new \AOSForceMonoRepo\Authentication\Models\Role;
        $role_3->name = "Utilisateur";
        $role_3->save();
    }
}
