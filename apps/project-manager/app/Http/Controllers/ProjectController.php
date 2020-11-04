<?php

namespace App\Http\Controllers;

use App\Agency;
use App\Client;
use App\Project;
use App\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use MongoDB\Driver\Query;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Project[]|Collection|Response
     */
    public function index()
    {
        if (request()->exists(['limit', 'page'])) {
            $query = Project::query();
            $this->searching($query);
            $filtersNotFillable = $this->filtering($query);
            $this->filteringNotFillable($query, $filtersNotFillable);
            $this->ordering($query);


            $projects = $this->paginating($query);
        } else {
            $projects = [];
        }

        return [
            'projects' => $projects,
            'roles' => Role::all(),
        ];
    }

    public function indexTags()
    {
        return Project::all(['_id', 'name']);
    }

    public function indexFrameworkContracts()
    {
        if (request()->exists(['limit', 'page'])) {
            $query = Project::query();

            $agency = request()->get('agency_name');

            $query->where('agency_name', '=', $agency)
                ->where('isFrameworkContract', true);

            $this->searching($query);
            $this->filtering($query);
            $this->ordering($query);

            $resultBeforeFilterCollection = $query->get();
            $filteredCollection = $this->filteringCollection($resultBeforeFilterCollection, $query->getModel()->getFillable());

            $frameworkContractProjects = $this->paginatingCollection($filteredCollection);
        } else {
            $frameworkContractProjects = [];
        }

        return [
            'projects' => $frameworkContractProjects
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Project|Model|Response
     */
    public function store(Request $request)
    {
        $newProject = Project::create($request->all());

        if ($request->filled('agency_name')) {
            $agency = Agency::firstOrCreate([
                'name' => $request->get('agency_name')
            ],
                [
                    'name' => $request->get('agency_name'),
                    'hoursOrdered' => 0
                ]);

            $agency->assignProjects([$newProject]);
        }

        if ($request->filled('contact_tags')) {
            $contactIds = [];
            foreach ($request->get('contact_tags') as $contact) {
                $contactIds[] = $contact['_id'];
            }
            $newProject->assignContacts($contactIds);
        }

        return $newProject;
    }

    public function getFromHubspot(Request $request)
    {
        $requestContent = $request->all();
        $isFrameworkContract = $requestContent['properties']['contrat_cadre']['value'] ?? '';
        $isFrameworkContract = $isFrameworkContract === 'Oui';
        $nbProjects = $requestContent['properties']['nombre_de_projets']['value'] ?? 0;
        $dealName = $requestContent['properties']['dealname']['value'] ?? '';
        preg_match('/(.+) - (.+)/', $requestContent['properties']['client_nom_localisation_']['value'] ?? '', $matches);
        $clientName = $matches[1] ?? '';
        $agency = $matches[2] ?? '';

        if ($isFrameworkContract) {
            $newClient = Client::firstOrCreate(['name' => $clientName],
                [
                    'name' => $clientName,
                    'projectsNumber' => $nbProjects,
                    'isFrameworkContract' => true
                ]
            );
            $newAgency = Agency::firstOrCreate(['name' => $agency],
                [
                    'name' => $agency,
                    'hoursOrdered' => 0
                ]
            );

            $newClient->assignAgencies([$newAgency]);

            $returnMessage = 'Successfully created 1 frameworkContract';
        } else {
            $newAgency = Agency::firstOrCreate(['name' => $agency],
                [
                    'name' => $agency,
                    'hoursOrdered' => 0
                ]
            );

            for ($i = 1; $i <= $nbProjects; $i++) {
                $newProject = Project::create([
                    'name' => $dealName,
                    'stage' => 'À venir',
                    'clientName' => $clientName,
                    'responseFormat' => '',
                    'clientExpectations' => "",
                    'formerWorking' => '',
                    'canAddCompaniesOnBatch' => false,
                    'priorityBatch' => '',
                    'batchToCome' => '',
                    'isOnOpenConsultation' => false,
                    'isAddableAutomaticallyOnOP' => false,
                    'nextStep' => '',
                    'companiesNumber' => null,
                    'supportAction' => '',
                    'userSales' => '',
                    'userCustomerManager' => '',
                    'userSupport' => [],
                    'dateStart' => '',
                    'dateEnd' => '',
                    'dateNext' => '',
                    'checklist' => [
                        'visio' => false,
                        'dpgfReceived' => false,
                        'dpgfSent' => false,
                        'companiesList' => false,
                        'companiesInvited' => false,
                        'mvSent' => false,
                        'formation50' => false,
                        'formation75' => false,
                        'formation100' => false,
                        'statusHalf' => false,
                        'statusEnd' => false,
                        'mailSent' => false,
                    ],
                    'contacts' => [],
                    'comments' => [],
                    'screenshot' => []
                ]);

                $newAgency->assignProjects([$newProject]);
            }
            $returnMessage = 'Successfully created '.$nbProjects.' project(s).';
        }
        return $returnMessage;
    }

    /**
     * Display the specified resource.
     *
     * @param  Project  $project
     * @return Project|Project[]|Collection|Model|Response
     */
    public function show(Project $project)
    {
        return $project;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Project  $project
     * @return Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Project  $project
     * @return Project|Response
     */
    public function update(Request $request, Project $project)
    {
        $project->update(request()->all());

        if ($request->filled('agency_name')) {
            $agency = Agency::firstOrCreate([
                'name' => $request->get('agency_name')
            ],
                [
                    'name' => $request->get('agency_name'),
                    'projectsNumber' => 0,
                    'hoursOrdered' => 0
                ]);

            $agency->assignProjects([$project]);
        }

        if ($request->filled('contact_tags')) {
            $contactIds = [];
            foreach ($request->get('contact_tags') as $contact) {
                $contactIds[] = $contact['_id'];
            }
            $project->contacts()->sync($contactIds);
        }

        return $project;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Project  $project
     * @return Response|int
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return 204;
    }
}
