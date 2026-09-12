<?php
declare(strict_types=1);

// Euronews SDK configuration

class EuronewsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Euronews",
                "slug" => "euronews",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://ru.euronews.com/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "new" => [],
                ],
            ],
            "entity" => [
        'new' => [
          'fields' => [
            [
              'name' => 'category',
              'short' => 'Category of the news (e.g., economy, politics, diplomacy)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Brief description or summary of the article',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the news article',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'publishedAt',
              'short' => 'Publication date and time',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'thumbnail',
              'short' => 'Thumbnail image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Title of the news article',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'short' => 'URL to the full article',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'videoUrl',
              'short' => 'URL to video content if available',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'new',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breaking-news.json',
                  'segments' => [
                    [
                      'lit' => 'breaking-news.json',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.articles`',
                  ],
                  'parts' => [
                    'breaking-news.json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return EuronewsFeatures::make_feature($name);
    }
}
