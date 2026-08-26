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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "name" => "publishedAt",
              "short" => "Publication date and time",
              "type" => "`$STRING`",
            },
            {
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
              "name" => "url",
              "short" => "URL to the full article",
              "type" => "`$STRING`",
            },
            {
              "name" => "videoUrl",
              "short" => "URL to video content if available",
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "breaking-news.json",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.articles`",
                  },
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
