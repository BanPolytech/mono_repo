<?php

namespace App\Http\Controllers;

use App\Agency;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AgencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Agency[]|Collection|Response
     */
    public function index()
    {
        return Agency::all();
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
     * @param Agency $agency
     * @return array|\Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function showProjects(Agency $agency)
    {
        $query = $agency->projects()->getQuery();
        $this->searching($query);
        $filtersNotFillable = $this->filtering($query);
        $this->filteringNotFillable($query, $filtersNotFillable);
        $this->ordering($query);

        return $this->paginating($query);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Agency|Model|Response
     */
    public function store(Request $request)
    {
        return Agency::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param Agency $agency
     * @return Agency|Agency[]|Collection|Model|Response
     */
    public function show(Agency $agency)
    {
        return $agency;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Agency $agency
     * @return Response
     */
    public function edit(Agency $agency)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Agency $agency
     * @return Agency|Response
     */
    public function update(Request $request, Agency $agency)
    {
        $agency->update(request()->all());

        return $agency;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Agency $agency
     * @return Response|int
     */
    public function destroy(Agency $agency)
    {
        $agency->delete();

        return 204;
    }
}
