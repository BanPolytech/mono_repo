<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            ModuleSeeder::class,
            AbilitySeeder::class,
            UserSeeder::class,
            ModuleRoleSeeder::class,
            SalesSeeder::class,
            OpsSeeder::class,
            SupportSeeder::class,
            ProjectSeeder::class,
            CompanySeeder::class,
            ContactSeeder::class,
            ProjectCompanySeeder::class
        ]);

    }
}
