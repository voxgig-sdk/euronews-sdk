# Euronews SDK configuration


def make_config():
    return {
        "main": {
            "name": "Euronews",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "category",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "publishedAt",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "thumbnail",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "title",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "videoUrl",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
        ],
        "name": "new",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
