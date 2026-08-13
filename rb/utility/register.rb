# Euronews SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EuronewsUtility.registrar = ->(u) {
  u.clean = EuronewsUtilities::Clean
  u.done = EuronewsUtilities::Done
  u.make_error = EuronewsUtilities::MakeError
  u.feature_add = EuronewsUtilities::FeatureAdd
  u.feature_hook = EuronewsUtilities::FeatureHook
  u.feature_init = EuronewsUtilities::FeatureInit
  u.fetcher = EuronewsUtilities::Fetcher
  u.make_fetch_def = EuronewsUtilities::MakeFetchDef
  u.make_context = EuronewsUtilities::MakeContext
  u.make_options = EuronewsUtilities::MakeOptions
  u.make_request = EuronewsUtilities::MakeRequest
  u.make_response = EuronewsUtilities::MakeResponse
  u.make_result = EuronewsUtilities::MakeResult
  u.make_point = EuronewsUtilities::MakePoint
  u.make_spec = EuronewsUtilities::MakeSpec
  u.make_url = EuronewsUtilities::MakeUrl
  u.param = EuronewsUtilities::Param
  u.prepare_auth = EuronewsUtilities::PrepareAuth
  u.prepare_body = EuronewsUtilities::PrepareBody
  u.prepare_headers = EuronewsUtilities::PrepareHeaders
  u.prepare_method = EuronewsUtilities::PrepareMethod
  u.prepare_params = EuronewsUtilities::PrepareParams
  u.prepare_path = EuronewsUtilities::PreparePath
  u.prepare_query = EuronewsUtilities::PrepareQuery
  u.graphql_body = EuronewsUtilities::GraphqlBody
  u.graphql_errors = EuronewsUtilities::GraphqlErrors
  u.result_basic = EuronewsUtilities::ResultBasic
  u.result_body = EuronewsUtilities::ResultBody
  u.result_headers = EuronewsUtilities::ResultHeaders
  u.transform_request = EuronewsUtilities::TransformRequest
  u.transform_response = EuronewsUtilities::TransformResponse
}
