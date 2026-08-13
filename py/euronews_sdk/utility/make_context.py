# Euronews SDK utility: make_context

from euronews_sdk.core.context import EuronewsContext


def make_context_util(ctxmap, basectx):
    return EuronewsContext(ctxmap, basectx)
