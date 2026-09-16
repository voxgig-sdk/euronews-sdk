# Euronews SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EuronewsFeatures
  def self.make_feature(name)
    case name
    when "base"
      EuronewsBaseFeature.new
    when "ratelimit"
      EuronewsRatelimitFeature.new
    when "retry"
      EuronewsRetryFeature.new
    when "test"
      EuronewsTestFeature.new
    when "timeout"
      EuronewsTimeoutFeature.new
    else
      EuronewsBaseFeature.new
    end
  end
end
