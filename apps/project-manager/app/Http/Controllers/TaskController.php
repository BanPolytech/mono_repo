<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Task[]|Collection|Response
     */
    public function index()
    {
        return Task::all();
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
     * @return Task|Model|Response
     */
    public function store(Request $request)
    {
        return Task::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param Task $task
     * @return Task|Task[]|Collection|Model|Response
     */
    public function show(Task $task)
    {
        return $task;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Task $task
     * @return Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Task $task
     * @return Task|Task[]|Collection|Model|Response
     */
    public function update(Request $request, Task $task)
    {
//        $task = Task::where('_id', '=', $task->getAttribute('_id'))->firstOrFail();
//        $task = Task::findOrFail($task->getAttribute('_id'));
//        $task = Task::find($task)->first();
        $task->update(request()->all());

        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Task $task
     * @return Response|int
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return 204;
    }
}
