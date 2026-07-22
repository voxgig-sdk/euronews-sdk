<?php
declare(strict_types=1);

// Euronews SDK utility: result_body

class EuronewsResultBody
{
    public static function call(EuronewsContext $ctx): ?EuronewsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
