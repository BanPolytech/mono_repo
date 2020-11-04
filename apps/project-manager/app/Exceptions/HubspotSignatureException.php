<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Log;

class HubspotSignatureException extends Exception
{
    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        Log::error($this->getMessage());
    }
}
