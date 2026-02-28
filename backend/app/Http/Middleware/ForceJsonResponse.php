<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceJsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Force header request to Accept JSON and Content-Type JSON
        $request->headers->set('Accept', 'application/json');
        
        $response = $next($request);

        // Ensure the response is always treated as JSON
        if ($response instanceof \Illuminate\Http\JsonResponse) {
            return $response;
        }

        // If for some reason it's not a JsonResponse, we try to force json header
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
