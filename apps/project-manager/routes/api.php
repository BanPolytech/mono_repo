<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Auth Endpoints
Route::group([
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LoginController@logout');
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('forgot-password', 'Auth\ForgotPasswordController@email');
    Route::post('password-reset', 'Auth\ResetPasswordController@reset');
});

// Project Endpoints
Route::group([
    'prefix' => 'v1/projects',
    'middleware' => 'jwt.auth'
], function ($router) {
    Route::get('', 'ProjectController@index');
    Route::get('tags', 'ProjectController@indexTags');
    Route::get('framework-contracts', 'ProjectController@indexFrameworkContracts');
    Route::get('{project}', 'ProjectController@show');
    Route::post('', 'ProjectController@store');
    Route::put('{project}', 'ProjectController@update');
    Route::delete('{project}', 'ProjectController@destroy');
});
Route::group([
    'prefix' => 'v1/projects',
    'middleware' => 'hubspot.check.signature'
], function ($router) {
    Route::post('get-from-hubspot', 'ProjectController@getFromHubspot');
});

// Contact Endpoints
Route::group([
    'prefix' => 'v1/contacts',
    'middleware' => 'jwt.auth'
], function ($router) {
    Route::get('', 'ContactController@index');
    Route::get('tags', 'ContactController@indexTags');
    Route::get('{contact}', 'ContactController@show');
    Route::post('', 'ContactController@store');
    Route::put('{contact}', 'ContactController@update');
    Route::delete('{contact}', 'ContactController@destroy');
});

// Task Endpoints
Route::group([
    'prefix' => 'v1/tasks',
    'middleware' => 'jwt.auth'
], function ($router) {
    Route::get('', 'TaskController@index');
    Route::get('{task}', 'TaskController@show');
    Route::post('', 'TaskController@store');
    Route::put('{task}', 'TaskController@update');
    Route::delete('{task}', 'TaskController@destroy');
});

// Client Endpoints
Route::group([
    'prefix' => 'v1/clients',
    'middleware' => 'jwt.auth'
], function ($router) {
    Route::get('', 'ClientController@index');
    Route::get('framework-contracts', 'ClientController@indexFrameworkContracts');
    Route::get('{client}', 'ClientController@showAgencies');
    Route::put('{client}', 'ClientController@update');
});

// Agency Endpoints
Route::group([
    'prefix' => 'v1/agencies',
    'middleware' => 'jwt.auth'
], function ($router) {
    Route::get('', 'AgencyController@index');
    Route::get('{agency}', 'AgencyController@showProjects');
    Route::put('{agency}', 'AgencyController@update');
});
