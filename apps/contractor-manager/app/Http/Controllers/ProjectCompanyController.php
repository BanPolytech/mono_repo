<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectCompany;
use App\Models\Contact;
use App\Models\Company;
use App\Models\Project;

class ProjectCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display a listing of the resource for specified project.
     *
     * @param  string  $projectId
     * @return \Illuminate\Http\Response
     */
    public function indexByProjectId($projectId)
    {
        $projectCompanies = ProjectCompany::where('project_id', $projectId)->get();

        if (request()->exists(['limit', 'page'])) {
            $parameters = request()->all();
            $limit = intval($parameters['limit']);
            $page = $parameters['page'];
            $projectCompanies = ProjectCompany::where('project_id', $projectId)->paginate($limit, ['*'], 'page', $page);
        } else {
            $projectCompanies = ProjectCompany::where('project_id', $projectId)->get();
        }

        return [
            'projectCompanies' => $projectCompanies,
        ];
    }

    /**
     * Display a listing of the companies by batch for specified project.
     *
     * @param  string  $projectId
     * @return \Illuminate\Http\Response
     */
    public function indexByBatch($projectId)
    {
        $projectCompanies = ProjectCompany::where('project_id', $projectId)->get();

        $pcByBatch = $projectCompanies->groupBy('batchNumber')->toArray();

        return $pcByBatch;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Import new companies from excel in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function import(Request $request, $projectId)
    {
        $projectCompanies = $request->all();

        $countCompany = 0;
        $countContact = 0;
        $countProjectCompany = 0;

        foreach ($projectCompanies as $projectCompany) {
            $company = Company::where('name', 'like', $projectCompany['ENT']);
            $isCompanyExist = $company->exists();

            if ($isCompanyExist) {
                $theCompany = $company->first();
            } else {
                $theCompany = Company::create([
                    'name' => $projectCompany['ENT']
                ]);
                $countCompany++;
            }

            $batchNumbers = explode('/', $projectCompany['N°']);
            $batchNames = explode('/', $projectCompany['LOT']);

            foreach ($batchNumbers as $key=>$batchNumber) {
                if (!ProjectCompany::where('batchNumber', 'like', $batchNumber)->where('project_id', 'like', $projectId)->where('company_id', 'like', $theCompany->_id)->exists()) {

                    //debut gestion contact
                    if (!array_key_exists('MAIL', $projectCompany) && !array_key_exists('N° TEL', $projectCompany) && !array_key_exists('N° PORTABLE', $projectCompany)) {
                        $isContactExist = false;
                    } else {
                        $contact = Contact::
                        where('email', 'like', array_key_exists('MAIL', $projectCompany) ? $projectCompany['MAIL'] : 'Non renseigné.')
                        ->where('phone', 'like', array_key_exists('N° TEL', $projectCompany) ? str_replace(' ', '', $projectCompany['N° TEL']) : 'Non renseigné.')
                        ->where('mobile', 'like', array_key_exists('N° PORTABLE', $projectCompany) ? str_replace(' ', '', $projectCompany['N° PORTABLE']) : 'Non renseigné.');

                        $isContactExist = $contact->exists();
                    }

                    if ($isContactExist) {
                        $theContact = $contact->first();
                    } else {
                        $theContact = Contact::create([
                            'email' => array_key_exists('MAIL', $projectCompany) ? $projectCompany['MAIL'] : 'Non renseigné.',
                            'phone' => array_key_exists('N° TEL', $projectCompany) ? str_replace(' ', '', $projectCompany['N° TEL']) : 'Non renseigné.',
                            'mobile' => array_key_exists('N° PORTABLE', $projectCompany) ? str_replace(' ', '', $projectCompany['N° PORTABLE']) : 'Non renseigné.'
                        ]);
                        $countContact++;
                    }
                    //fin gestion contact

                    $theProjectCompany = ProjectCompany::create([
                        'batchNumber' => $batchNumber,
                        'batchName' => $batchNames[$key]
                    ]);

                    $countProjectCompany++;

                    $theContact->assignCompany($theCompany);

                    $theProjectCompany->assignCompany($theCompany);
                    $theProjectCompany->assignContact($theContact);
                    $theProject = Project::where('_id', $projectId)->first();
                    $theProjectCompany->assignProject($theProject);
                }
            }
        }

        return [
            'companies' => $countCompany,
            'contacts' => $countContact,
            'projectCompanies' => $countProjectCompany,
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
