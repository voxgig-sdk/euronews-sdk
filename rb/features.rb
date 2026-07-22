# Euronews SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EuronewsFeatures
  def self.make_feature(name)
    case name
    when "base"
      EuronewsBaseFeature.new
    when "test"
      EuronewsTestFeature.new
    else
      EuronewsBaseFeature.new
    end
  end
end
