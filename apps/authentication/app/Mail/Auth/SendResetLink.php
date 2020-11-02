<?php

namespace App\Mail\Auth;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendResetLink extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The user who request the resetting of the password.
     *
     * @var App\User
     */
    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.auth.send-reset-link');
    }
}
