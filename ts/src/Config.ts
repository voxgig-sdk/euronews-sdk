
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Euronews',
        slug: "euronews",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://ru.euronews.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        new: {
        },
  
    }
  }


  entity = {
    "new": {
      "fields": [
        {
          "name": "category",
          "title": "Category",
          "type": "`$STRING`",
          "short": "Category of the news (e.g., economy, politics, diplomacy)"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Brief description or summary of the article"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the news article"
        },
        {
          "name": "publishedAt",
          "title": "Published At",
          "type": "`$STRING`",
          "short": "Publication date and time",
          "format": "date-time"
        },
        {
          "name": "thumbnail",
          "title": "Thumbnail",
          "type": "`$STRING`",
          "short": "Thumbnail image URL",
          "format": "uri"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the news article"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "URL to the full article",
          "format": "uri"
        },
        {
          "name": "videoUrl",
          "title": "Video Url",
          "type": "`$STRING`",
          "short": "URL to video content if available",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "new",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breaking-news.json",
              "segments": [
                {
                  "lit": "breaking-news.json"
                }
              ],
              "parts": [
                "breaking-news.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.articles`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

