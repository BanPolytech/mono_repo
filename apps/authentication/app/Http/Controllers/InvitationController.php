<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class InvitationController extends Controller
{
    /**
     * Validate an invitation by the URL parameters.
     *
     * @param string $email
     * @param string $token
     * @return array|App\User
     */
    protected function validateSession($email, $token)
    {
        $invitation = User::where('email', $email)->where('invitation_token', $token)->first();

        // The invitation doesn't exist.
        if (!$invitation) {
            return ['error' => 'Invitation non trouvée.'];
        }

        // The user already performed the registration.
        if ($invitation->password) {
            return ['error' => 'L\'utilisateur est déjà enregistré.'];
        }

        // The invitation has expired.
        if ($invitation->invitation_token_at->diffInHours() > 48) {
            $invitation->delete();

            return ['error' => 'L\'invitation a expirée.'];
        }

        return $invitation;
    }

    /**
     * Return the invitation for the front side.
     *
     * @param string $email
     * @param string $token
     * @return array
     */
    public function showInvitation($email, $token)
    {
        $invitation = $this->validateSession($email, $token);

        if (is_array($invitation)) {
            return $invitation;
        }

        return ['invitation' => optional($invitation->sentBy())->name];
    }

    /**
     * Register the user after receiving an invitation link.
     *
     * @param string $email
     * @param string $token
     * @return array
     */
    public function registerAfterInvitation($email, $token)
    {
        $invitation = $this->validateSession($email, $token);

        if (is_array($invitation)) {
            return $invitation;
        }

        // Validate the request.
        request()->validate([
            'password' => 'required|confirmed',
            'password_confirmation' => 'required',
            'name' => 'required|unique:users'
        ]);

        // Create the account of the user.
        $invitation->update([
            'password' => bcrypt(request('password')),
            'name' => request('name')
        ]);

        // Remove invitation fields.
        $invitation->unset('invitation_token');
        $invitation->unset('invitation_token_at');
        $invitation->unset('invitation_token_by');

        return ['success' => true, 'name' => request('name')];
    }
}
