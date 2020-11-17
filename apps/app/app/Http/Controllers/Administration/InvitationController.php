<?php

namespace App\Http\Controllers\Administration;

use App\Http\Controllers\Controller;
use App\User;

class InvitationController extends Controller
{
    public function createInvitation()
    {
        $user = User::createInvitation('foo@bar.com');
    }
}
