<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\Company;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $contacts = [
            ['empi.contact.pro@gmail.com', '0494538741', '0652627963'],
            ['epn@9business.fr', '0494649566', '0612511856'],
            ['emp.lagarde@wanadoo.fr', '0498045040', '0610593842'],
        ];
        $enterprises = ['EMPI', 'EPN - ETANCHEITE PEINTURE NETTOYAGE', 'EMP'];

        foreach ($contacts as $key=>$contact) {
            $theContact = Contact::create([
                'email' => $contact[0],
                'phone' => $contact[1],
                'mobile' => $contact[2],
            ]);
            $theCompany = Company::where('name', $enterprises[$key])->first();
            $theContact->assignCompany($theCompany);
        }
    }
}
