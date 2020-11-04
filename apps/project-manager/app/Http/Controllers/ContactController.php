<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Contact[]|Collection|Response
     */
    public function index()
    {
        return [
            'contacts' => Contact::all(),
        ];
    }

    public function indexTags()
    {
        return Contact::all(['_id', 'firstname', 'lastname']);
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
     * @param Request $request
     * @return Contact|Model|Response
     */
    public function store(Request $request)
    {
        $newContact = Contact::create($request->all());

        if ($request->filled('project_tags')) {
            $projects = [];
            foreach ($request->get('project_tags') as $project) {
                $projects[] = $project['_id'];
            }
            $newContact->assignProjects($projects);
        }

        return $newContact;
    }

    /**
     * Display the specified resource.
     *
     * @param Contact $contact
     * @return Contact|Contact[]|Collection|Model|Response
     */
    public function show(Contact $contact)
    {
        return $contact;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Contact $contact
     * @return Response
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Contact $contact
     * @return Contact|Response
     */
    public function update(Request $request, Contact $contact)
    {
        $contact->update(request()->all());

        if ($request->filled('project_tags')) {
            $projects = [];
            foreach ($request->get('project_tags') as $project) {
                $projects[] = $project['_id'];
            }
            $contact->projects()->sync($projects);
        }

        return $contact;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Contact $contact
     * @return Response|int
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return 204;
    }
}
