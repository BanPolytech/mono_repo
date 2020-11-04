<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectCompanyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Project Endpoints
Route::group([
    'prefix' => 'v1/projects'
], function ($router) {
    Route::get('', [ProjectController::class, 'index']);
    Route::get('{project}', [ProjectController::class, 'show']);
});

// ProjectCompany Endpoints
Route::group([
    'prefix' => 'v1/projectCompanies'
], function ($router) {
    Route::get('byProjectId/{projectId}', [ProjectCompanyController::class, 'indexByProjectId']);
    Route::get('byProjectId/{projectId}/byBatch', [ProjectCompanyController::class, 'indexByBatch']);
    Route::post('byProjectId/{projectId}/import', [ProjectCompanyController::class, 'import']);
});
