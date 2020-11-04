<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
        ]);

        DB::table('users')->insertGetId([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => Hash::make('testtest')
        ]);

        $jeanId = DB::table('users')->insertGetId([
            'name' => 'Jean',
            'email' => 'jean@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $paulId = DB::table('users')->insertGetId([
            'name' => 'Paul',
            'email' => 'paul@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $jackId = DB::table('users')->insertGetId([
            'name' => 'Jack',
            'email' => 'jack@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $ops1Id = DB::table('users')->insertGetId([
            'name' => 'Ops1',
            'email' => 'ops1@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $ops2Id = DB::table('users')->insertGetId([
            'name' => 'Ops2',
            'email' => 'ops2@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $ops3Id = DB::table('users')->insertGetId([
            'name' => 'Ops3',
            'email' => 'ops3@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $manager1Id = DB::table('users')->insertGetId([
            'name' => 'Manager1',
            'email' => 'manager1@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $manager2Id = DB::table('users')->insertGetId([
            'name' => 'Manager2',
            'email' => 'manager2@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $manager3Id = DB::table('users')->insertGetId([
            'name' => 'Manager3',
            'email' => 'manager3@gmail.com',
            'password' => Hash::make('testtest')
        ]);

        $manager = \App\Role::where('name', '=', 'manager')->first();
        $support = \App\Role::where('name', '=', 'support')->first();
        $sales = \App\Role::where('name', '=', 'sales')->first();

        \App\User::find($jeanId)->assignRole($manager);
        \App\User::find($paulId)->assignRole($support);
        \App\User::find($jackId)->assignRole($sales);

        \App\User::find($ops1Id)->assignRole($support);
        \App\User::find($ops2Id)->assignRole($support);
        \App\User::find($ops3Id)->assignRole($support);

        \App\User::find($manager1Id)->assignRole($manager);
        \App\User::find($manager2Id)->assignRole($manager);
        \App\User::find($manager3Id)->assignRole($manager);
    }
}
