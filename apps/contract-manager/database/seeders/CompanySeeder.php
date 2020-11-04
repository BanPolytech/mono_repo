<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $enterprises = ['EMPI', 'EPN - ETANCHEITE PEINTURE NETTOYAGE', 'EMP'];
        foreach ($enterprises as $enterprise) {
            Company::create([
                'name' => $enterprise
            ]);
        }
    }
}
