<?php
declare(strict_types=1);

// Euronews SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EuronewsMakeContext
{
    public static function call(array $ctxmap, ?EuronewsContext $basectx): EuronewsContext
    {
        return new EuronewsContext($ctxmap, $basectx);
    }
}
