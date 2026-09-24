
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EuronewsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EuronewsSDK.test()
    equal(testsdk instanceof EuronewsSDK, true,
      'EuronewsSDK.test() must return a client synchronously')
  })

})
