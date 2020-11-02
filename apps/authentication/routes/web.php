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

Route::get('{path}', function () {
    if (isset($_COOKIE['access_token'])) {
        return redirect('/dashboard');
    }

    return view('layouts.app');
})->where('path', '(connexion|register|identifiants\-perdus|reinitialiser\-identifiants)');

Route::view('{path?}', 'layouts.app')->where('path', '.*');
