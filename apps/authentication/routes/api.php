<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ForgotPasswordController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Log in utils.
Route::post('login', [LoginController::class, 'login']);
Route::post('forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::get('recovery-password/{email}/{token}', [ResetPasswordController::class, 'showResetData']);
Route::post('recovery-password/{email}/{token}', [ResetPasswordController::class, 'reset']);

// Invitation
Route::get('invitation/{email}/{token}', [InvitationController::class, 'showInvitation']);
Route::post('invitation/{email}/{token}', [InvitationController::class, 'registerAfterInvitation']);
