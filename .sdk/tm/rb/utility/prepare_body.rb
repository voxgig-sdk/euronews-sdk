# Euronews SDK utility: prepare_body
require_relative 'media'
module EuronewsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return EuronewsUtilities.raw_body(ctx.reqdata) if EuronewsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
