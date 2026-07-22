# ProjectName SDK exists test

import pytest
from euronews_sdk import EuronewsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = EuronewsSDK.test(None, None)
        assert testsdk is not None
