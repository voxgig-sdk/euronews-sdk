-- Euronews SDK error

local EuronewsError = {}
EuronewsError.__index = EuronewsError


function EuronewsError.new(code, msg, ctx)
  local self = setmetatable({}, EuronewsError)
  self.is_sdk_error = true
  self.sdk = "Euronews"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EuronewsError:error()
  return self.msg
end


function EuronewsError:__tostring()
  return self.msg
end


return EuronewsError
