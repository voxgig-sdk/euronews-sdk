
import { Context } from './Context'


class EuronewsError extends Error {

  isEuronewsError = true

  sdk = 'Euronews'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EuronewsError
}

