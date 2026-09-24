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
              "title" => "Category",
              "type" => "`$STRING`",
              "short" => "Category of the news (e.g., economy, politics, diplomacy)",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Brief description or summary of the article",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier for the news article",
            },
            {
              "name" => "publishedAt",
              "title" => "Published At",
              "type" => "`$STRING`",
              "short" => "Publication date and time",
              "format" => "date-time",
            },
            {
              "name" => "thumbnail",
              "title" => "Thumbnail",
              "type" => "`$STRING`",
              "short" => "Thumbnail image URL",
              "format" => "uri",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "short" => "Title of the news article",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "URL to the full article",
              "format" => "uri",
            },
            {
              "name" => "videoUrl",
              "title" => "Video Url",
              "type" => "`$STRING`",
              "short" => "URL to video content if available",
              "format" => "uri",
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
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/breaking-news.json",
                  "segments" => [
                    {
                      "lit" => "breaking-news.json",
                    },
                  ],
                  "parts" => [
                    "breaking-news.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.articles`",
                  },
                  "args" => {},
                  "select" => {},
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
