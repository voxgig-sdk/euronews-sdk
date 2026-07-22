# Euronews SDK feature factory

from feature.base_feature import EuronewsBaseFeature
from feature.test_feature import EuronewsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EuronewsBaseFeature(),
        "test": lambda: EuronewsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
