
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Euronews',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://ru.euronews.com/api',

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
          "active": true,
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "publishedAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "thumbnail",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "videoUrl",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "new",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/breaking-news.json",
              "parts": [
                "breaking-news.json"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.articles`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
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
  config
}

