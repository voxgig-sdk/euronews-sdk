package voxgigeuronewssdk

import (
	"github.com/voxgig-sdk/euronews-sdk/go/core"
	"github.com/voxgig-sdk/euronews-sdk/go/entity"
	"github.com/voxgig-sdk/euronews-sdk/go/feature"
	_ "github.com/voxgig-sdk/euronews-sdk/go/utility"
)

// Type aliases preserve external API.
type EuronewsSDK = core.EuronewsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EuronewsEntity = core.EuronewsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type EuronewsError = core.EuronewsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewNewEntityFunc = func(client *core.EuronewsSDK, entopts map[string]any) core.EuronewsEntity {
		return entity.NewNewEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEuronewsSDK = core.NewEuronewsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewEuronewsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *EuronewsSDK  { return NewEuronewsSDK(nil) }
func Test() *EuronewsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
