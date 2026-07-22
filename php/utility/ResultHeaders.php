<?php
declare(strict_types=1);

// Euronews SDK utility: result_headers

class EuronewsResultHeaders
{
    public static function call(EuronewsContext $ctx): ?EuronewsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
