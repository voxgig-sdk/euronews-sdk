
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "Category of the news (e.g., economy, politics, diplomacy)",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Brief description or summary of the article",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the news article",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "publishedAt",
          "short": "Publication date and time",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "thumbnail",
          "short": "Thumbnail image URL",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "Title of the news article",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "url",
          "short": "URL to the full article",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "videoUrl",
          "short": "URL to video content if available",
          "type": "`$STRING`"
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
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/breaking-news.json",
              "segments": [
                {
                  "lit": "breaking-news.json"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.articles`"
              },
              "parts": [
                "breaking-news.json"
              ]
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

