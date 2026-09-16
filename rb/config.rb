# Euronews SDK configuration

module EuronewsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Euronews",
        "slug" => "euronews",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://ru.euronews.com/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "new" => {},
        },
      },
      "entity" => {
        "new" => {
          "fields" => [
            {
              "name" => "category",
              "short" => "Category of the news (e.g., economy, politics, diplomacy)",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Brief description or summary of the article",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the news article",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "publishedAt",
              "short" => "Publication date and time",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "thumbnail",
              "short" => "Thumbnail image URL",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "short" => "Title of the news article",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "url",
              "short" => "URL to the full article",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "videoUrl",
              "short" => "URL to video content if available",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "new",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/breaking-news.json",
                  "segments" => [
                    {
                      "lit" => "breaking-news.json",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.articles`",
                  },
                  "parts" => [
                    "breaking-news.json",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    EuronewsFeatures.make_feature(name)
  end
end
