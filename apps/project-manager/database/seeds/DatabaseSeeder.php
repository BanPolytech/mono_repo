<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment('production')) {
            $this->call([
                RoleSeeder::class,
                UserSeederProduction::class
            ]);
        } else {
            $this->call([
                RoleSeeder::class,
                UserSeeder::class,
                ProjectSeeder::class,
                ContactSeeder::class,
            ]);
        }
    }
}
