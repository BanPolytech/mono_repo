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
        $super_admin = \App\Models\Role::where('name', '=', 'Super Admin')->first();
        $admin = \App\Models\Role::where('name', '=', 'Admin')->first();
        $utilisateur = \App\Models\Role::where('name', '=', 'Utilisateur')->first();

        /** GET MODULES */
        $lead_finder = \App\Models\Module::where('name', '=', 'Lead Finder')->first();
        $project_manager = \App\Models\Module::where('name', '=', 'Project Manager')->first();
        $contractor_manager = \App\Models\Module::where('name', '=', 'Contractor Manager')->first();
        $aos_force = \App\Models\Module::where('name', '=', 'AOS Force')->first();

        /** GET ABILITIES */
        $access = \App\Models\Ability::where('name', '=', 'access')->first();
        $add = \App\Models\Ability::where('name', '=', 'add')->first();
        $delete = \App\Models\Ability::where('name', '=', 'delete')->first();
        $all[] = $access;
        $all[] = $add;
        $all[] = $delete;

        /** GET USERS */
        $guillaume = \App\Models\User::where('email', '=', 'guillaume@go-aos.io')->first();
        $esteban = \App\Models\User::where('email', '=', 'esteban@go-aos.io')->first();
        $kevin = \App\Models\User::where('email', '=', 'kevin@go-aos.io')->first();
        $cyril = \App\Models\User::where('email', '=', 'cyril.besseyre@go-aos.io')->first();
        $marc = \App\Models\User::where('email', '=', 'marc@go-aos.io')->first();
        $thibault = \App\Models\User::where('email', '=', 'thibault@go-aos.io')->first();
        $fanny = \App\Models\User::where('email', '=', 'fanny@go-aos.io')->first();
        $charlotte = \App\Models\User::where('email', '=', 'charlotte@go-aos.io')->first();
        $corentin = \App\Models\User::where('email', '=', 'corentin.prioul@go-aos.io')->first();
        $mariem = \App\Models\User::where('email', '=', 'mariem@go-aos.io')->first();

        $users_SA[] = $guillaume;
        $users_SA[] = $kevin;

        $users_LFAD[] = $cyril;
        $users_LFAD[] = $marc;

        $users_PMAD[] = $esteban;
        $users_PMAD[] = $fanny;

        $users_CMAD[] = $guillaume;
        $users_CMAD[] = $corentin;

        /**  CREATE AOS FORCE SUPER ADMIN IN MODULE ROLE */
        $sa_mr = new \App\Models\Module_Role;
        $sa_mr->role()->associate($super_admin);
        $sa_mr->module()->associate($aos_force);
        $sa_mr->save();
        $access->module_role()->associate($sa_mr);
        $add->module_role()->associate($sa_mr);
        $delete->module_role()->associate($sa_mr);
        $sa_mr->assignUsers($users_SA);

        /**  CREATE LEAD FINDER ADMIN IN MODULE ROLE */
        $lf_ad_mr = new \App\Models\Module_Role;
        $lf_ad_mr->role()->associate($admin);
        $lf_ad_mr->module()->associate($lead_finder);
        $lf_ad_mr->save();
        // $lf_ad_mr->assignAbility($access);
        // $lf_ad_mr->assignAbility($add);
        // $lf_ad_mr->assignAbility($delete);
        $lf_ad_mr->assignUsers($users_LFAD);

        /**  CREATE PROJECT MANAGER ADMIN IN MODULE ROLE */
        $pm_ad_mr = new \App\Models\Module_Role;
        $pm_ad_mr->role()->associate($admin);
        $pm_ad_mr->module()->associate($project_manager);
        $pm_ad_mr->save();
        // $pm_ad_mr->assignAbility($access);
        // $pm_ad_mr->assignAbility($add);
        // $pm_ad_mr->assignAbility($delete);
        $pm_ad_mr->assignUsers($users_PMAD);

        /**  CREATE CONTRACTOR MANAGER ADMIN IN MODULE ROLE */
        $cm_ad_mr = new \App\Models\Module_Role;
        $cm_ad_mr->role()->associate($admin);
        $cm_ad_mr->module()->associate($contractor_manager);
        $cm_ad_mr->save();
        // $cm_ad_mr->assignAbility($access);
        // $cm_ad_mr->assignAbility($add);
        // $cm_ad_mr->assignAbility($delete);
        $cm_ad_mr->assignUsers($users_CMAD);

        /**  CREATE LEAD FINDER UTILISATEUR IN MODULE ROLE */
        $lf_ad_mr = new \App\Models\Module_Role;
        $lf_ad_mr->role()->associate($utilisateur);
        $lf_ad_mr->module()->associate($lead_finder);
        $lf_ad_mr->save();
        // $lf_ad_mr->assignAbility($access);
        $lf_ad_mr->assignUser($thibault);

        /**  CREATE PROJECT MANAGER UTILISATEUR IN MODULE ROLE */
        $pm_ad_mr = new \App\Models\Module_Role;
        $pm_ad_mr->role()->associate($utilisateur);
        $pm_ad_mr->module()->associate($project_manager);
        $pm_ad_mr->save();
        // $pm_ad_mr->assignAbility($access);
        $pm_ad_mr->assignUser($charlotte);

        /**  CREATE CONTRACTOR MANAGER UTILISATEUR IN MODULE ROLE */
        $cm_ad_mr = new \App\Models\Module_Role;
        $cm_ad_mr->role()->associate($utilisateur);
        $cm_ad_mr->module()->associate($contractor_manager);
        $cm_ad_mr->save();
        // $cm_ad_mr->assignAbility($access);
        $cm_ad_mr->assignUser($mariem);



    }
}
