<?php
declare(strict_types=1);

// Euronews SDK utility: prepare_body

class EuronewsPrepareBody
{
    public static function call(EuronewsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
