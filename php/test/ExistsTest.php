<?php
declare(strict_types=1);

// Euronews SDK exists test

require_once __DIR__ . '/../euronews_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = EuronewsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
