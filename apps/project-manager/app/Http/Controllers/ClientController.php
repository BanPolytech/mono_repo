<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Client[]|Collection|Response
     */
    public function index()
    {
        return Client::all();
    }

    /**
     * Display a listing of the resource.
     *
     * @return
     */
    public function indexFrameworkContracts()
    {
        return Client::where('isFrameworkContract', true)->get();
    }

    /**
     * @param Client $client
     * @return Collection
     */
    public function showAgencies(Client $client)
    {
        return $client->agencies()->get();
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
     * @return Client|Model|Response
     */
    public function store(Request $request)
    {
        return Client::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param Client $client
     * @return Client|Client[]|Collection|Model|Response
     */
    public function show(Client $client)
    {
        return $client;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Client $client
     * @return Response
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Client $client
     * @return Client|Client[]|Collection|Model|Response
     */
    public function update(Client $client)
    {
        $client->update(request()->all());

        return $client;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Client $client
     * @return Response|int
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return 204;
    }
}
