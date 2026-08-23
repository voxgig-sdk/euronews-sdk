package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Euronews",
			"slug": "euronews",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://ru.euronews.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"new": map[string]any{},
			},
		},
		"entity": map[string]any{
			"new": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"short": "Category of the news (e.g., economy, politics, diplomacy)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Brief description or summary of the article",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the news article",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "publishedAt",
						"short": "Publication date and time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "thumbnail",
						"short": "Thumbnail image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the news article",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "URL to the full article",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "videoUrl",
						"short": "URL to video content if available",
						"type": "`$STRING`",
					},
				},
				"name": "new",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/breaking-news.json",
								"parts": []any{
									"breaking-news.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.articles`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
