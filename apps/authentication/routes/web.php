<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn () => redirect('/connexion'));

$authenticationRoutes = function () {
    if (isset($_COOKIE['access_token'])) {
        return redirect('/dashboard');
    }

    return view('layouts.app');
};

Route::get('/invitation/{email}/{token}', $authenticationRoutes);
Route::get('/connexion', $authenticationRoutes);
Route::get('/identifiants-perdus', $authenticationRoutes);
Route::get('/reinitialiser-identifiants/{email}/{token}', $authenticationRoutes);


Route::group(['middleware' => 'authenticated'], function () {
    Route::view('{path}', 'layouts.app')->where('path', '.*');
});
