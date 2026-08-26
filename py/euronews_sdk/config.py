# Euronews SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Euronews",
            "slug": "euronews",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://ru.euronews.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "new": {},
            },
        },
        "entity": {
      "new": {
        "fields": [
          {
            "name": "category",
            "short": "Category of the news (e.g., economy, politics, diplomacy)",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Brief description or summary of the article",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the news article",
            "type": "`$STRING`",
          },
          {
            "name": "publishedAt",
            "short": "Publication date and time",
            "type": "`$STRING`",
          },
          {
            "name": "thumbnail",
            "short": "Thumbnail image URL",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the news article",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "URL to the full article",
            "type": "`$STRING`",
          },
          {
            "name": "videoUrl",
            "short": "URL to video content if available",
            "type": "`$STRING`",
          },
        ],
        "name": "new",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/breaking-news.json",
                "parts": [
                  "breaking-news.json",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.articles`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
