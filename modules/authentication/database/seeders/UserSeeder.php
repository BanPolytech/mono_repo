<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user_1 = new \AOSForceMonoRepo\Authentication\Models\User;
        $user_1->name = "Guillaume";
        $user_1->email = "guillaume@go-aos.io";
        $user_1->password = password_hash("testtest", PASSWORD_DEFAULT);
        $user_1->save();

        $user_2 = new \AOSForceMonoRepo\Authentication\Models\User;
        $user_2->name = "Esteban";
        $user_2->email = "esteban@go-aos.io";
        $user_2->password = password_hash("testtest", PASSWORD_DEFAULT);
        $user_2->save();

        $user_3 = new \AOSForceMonoRepo\Authentication\Models\User;
        $user_3->name = "Kevin";
        $user_3->email = "kevin@go-aos.io";
        $user_3->password = password_hash("testtest", PASSWORD_DEFAULT);
        $user_3->save();

        $user_4 = new \AOSForceMonoRepo\Authentication\Models\User;
        $user_4->name = "Cyril";
        $user_4->email = "cyril.besseyre@go-aos.io";
        $user_4->password = password_hash("testtest", PASSWORD_DEFAULT);
        $user_4->save();

        $user_5 = new \AOSForceMonoRepo\Authentication\Models\User;
        $user_5->name = "Elsa";
        $user_5->email = "elsa@go-aos.io";
        $user_5->password = password_hash("testtest", PASSWORD_DEFAULT);
        $user_5->save();

        $user_6 = new \AOSForceMonoRepo\Authentication\Models\User;
        $user_6->name = "Idriss";
        $user_6->email = "idriss@go-aos.io";
        $user_6->password = password_hash("testtest", PASSWORD_DEFAULT);
        $user_6->save();

        $user_7 = new \AOSForceMonoRepo\Authentication\Models\User;
        $user_7->name = "Louis";
        $user_7->email = "louis@go-aos.io";
        $user_7->password = password_hash("testtest", PASSWORD_DEFAULT);
        $user_7->save();

    }
}
