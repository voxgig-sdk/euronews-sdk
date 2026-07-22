# Euronews SDK utility: make_context
require_relative '../core/context'
module EuronewsUtilities
  MakeContext = ->(ctxmap, basectx) {
    EuronewsContext.new(ctxmap, basectx)
  }
end
