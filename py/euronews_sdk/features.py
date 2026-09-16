# Euronews SDK feature factory

from euronews_sdk.feature.base_feature import EuronewsBaseFeature
from euronews_sdk.feature.ratelimit_feature import EuronewsRatelimitFeature
from euronews_sdk.feature.retry_feature import EuronewsRetryFeature
from euronews_sdk.feature.test_feature import EuronewsTestFeature
from euronews_sdk.feature.timeout_feature import EuronewsTimeoutFeature


_FEATURES = {
    "base": lambda: EuronewsBaseFeature(),
    "ratelimit": lambda: EuronewsRatelimitFeature(),
    "retry": lambda: EuronewsRetryFeature(),
    "test": lambda: EuronewsTestFeature(),
    "timeout": lambda: EuronewsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
