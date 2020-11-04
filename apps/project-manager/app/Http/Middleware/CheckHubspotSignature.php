<?php

namespace App\Http\Middleware;

use App\Exceptions\HubspotSignatureException;
use Closure;
use Illuminate\Http\Request;
use App\Facades\Constants;

class CheckHubspotSignature
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     * @throws HubspotSignatureException
     */
    public function handle(Request $request, Closure $next)
    {
        $hubSpotSignature = $request->header('X-HubSpot-Signature');

        $requestURI = $request->url();
        $requestBody = $request->getContent();

        // Transformer le http en https car Laravel l'a remis en http
        $requestURI = str_replace('http://', 'https://', $requestURI);

        $hashToCompare = hash('sha256', env('HUBSPOT_SECRET') . 'POST' . $requestURI . $requestBody);

        if ($hubSpotSignature === $hashToCompare) {
            return $next($request);
        } else {
            $debug = env('HUBSPOT_SECRET') . 'POST' . $requestURI . $requestBody;
            throw new HubspotSignatureException(
                "Signature does not match." .
                "\nHubspot Signature : " . $hubSpotSignature .
                "\nHash created : " . $hashToCompare .
                "\nRequest hashed : " . $debug,
                Constants::HUBSPOT_SIGNATURE_DIFFERENT
            );
        }
    }
}
