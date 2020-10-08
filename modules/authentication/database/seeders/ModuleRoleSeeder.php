<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** GET ROLES */
        $super_admin = \AOSForceMonoRepo\Authentication\Models\Role::where('name', '=', 'Super Admin')->first();
        $admin = \AOSForceMonoRepo\Authentication\Models\Role::where('name', '=', 'Admin')->first();
        $utilisateur = \AOSForceMonoRepo\Authentication\Models\Role::where('name', '=', 'Utilisateur')->first();

        /** GET MODULES */
        $lead_finder = \AOSForceMonoRepo\Authentication\Models\Module::where('name', '=', 'Lead Finder')->first();
        $project_manager = \AOSForceMonoRepo\Authentication\Models\Module::where('name', '=', 'Project Manager')->first();
        $contractor_manager = \AOSForceMonoRepo\Authentication\Models\Module::where('name', '=', 'Contractor Manager')->first();
        $aos_force = \AOSForceMonoRepo\Authentication\Models\Module::where('name', '=', 'AOS Force')->first();

        /** GET ABILITIES */
        $access = \AOSForceMonoRepo\Authentication\Models\Ability::where('name', '=', 'access')->first();
        $add = \AOSForceMonoRepo\Authentication\Models\Ability::where('name', '=', 'add')->first();
        $delete = \AOSForceMonoRepo\Authentication\Models\Ability::where('name', '=', 'delete')->first();
        $all[] = $access;
        $all[] = $add;
        $all[] = $delete;

        /** GET USERS */
        $users[] = \AOSForceMonoRepo\Authentication\Models\User::all();
        $guillaume = $users[0][0];
        $esteban = $users[0][1];
        $kevin = $users[0][2];
        $cyril = $users[0][3];
        $elsa = $users[0][4];
        $idriss = $users[0][5];
        $louis = $users[0][6];
        $users_SA[] = $guillaume;
        $users_SA[] = $kevin;

        /**  CREATE AOS FORCE SUPER ADMIN IN MODULE ROLE */
        $sa_mr = new \AOSForceMonoRepo\Authentication\Models\Module_Role;
        $sa_mr->role()->associate($super_admin);
        $sa_mr->module()->associate($aos_force);
        $sa_mr->save();
        $sa_mr->assignAbilities($all);
        $sa_mr->assignUsers($users_SA);

        /**  CREATE LEAD FINDER ADMIN IN MODULE ROLE */
        $lf_ad_mr = new \AOSForceMonoRepo\Authentication\Models\Module_Role;
        $lf_ad_mr->role()->associate($admin);
        $lf_ad_mr->module()->associate($lead_finder);
        $lf_ad_mr->save();
        $lf_ad_mr->assignAbilities($all);
        $lf_ad_mr->assignUser($cyril);

        /**  CREATE PROJECT MANAGER ADMIN IN MODULE ROLE */
        $pm_ad_mr = new \AOSForceMonoRepo\Authentication\Models\Module_Role;
        $pm_ad_mr->role()->associate($admin);
        $pm_ad_mr->module()->associate($project_manager);
        $pm_ad_mr->save();
        $pm_ad_mr->assignAbilities($all);
        $pm_ad_mr->assignUser($esteban);

        /**  CREATE CONTRACTOR MANAGER ADMIN IN MODULE ROLE */
        $cm_ad_mr = new \AOSForceMonoRepo\Authentication\Models\Module_Role;
        $cm_ad_mr->role()->associate($admin);
        $cm_ad_mr->module()->associate($contractor_manager);
        $cm_ad_mr->save();
        $cm_ad_mr->assignAbilities($all);
        $cm_ad_mr->assignUser($guillaume);

        /**  CREATE LEAD FINDER UTILISATEUR IN MODULE ROLE */
        $lf_ad_mr = new \AOSForceMonoRepo\Authentication\Models\Module_Role;
        $lf_ad_mr->role()->associate($utilisateur);
        $lf_ad_mr->module()->associate($lead_finder);
        $lf_ad_mr->save();
        $lf_ad_mr->assignAbility($access);
        $lf_ad_mr->assignUser($elsa);

        /**  CREATE PROJECT MANAGER UTILISATEUR IN MODULE ROLE */
        $pm_ad_mr = new \AOSForceMonoRepo\Authentication\Models\Module_Role;
        $pm_ad_mr->role()->associate($utilisateur);
        $pm_ad_mr->module()->associate($project_manager);
        $pm_ad_mr->save();
        $pm_ad_mr->assignAbility($access);
        $pm_ad_mr->assignUser($idriss);

        /**  CREATE CONTRACTOR MANAGER UTILISATEUR IN MODULE ROLE */
        $cm_ad_mr = new \AOSForceMonoRepo\Authentication\Models\Module_Role;
        $cm_ad_mr->role()->associate($utilisateur);
        $cm_ad_mr->module()->associate($contractor_manager);
        $cm_ad_mr->save();
        $cm_ad_mr->assignAbility($access);
        $cm_ad_mr->assignUser($louis);

    }
}
