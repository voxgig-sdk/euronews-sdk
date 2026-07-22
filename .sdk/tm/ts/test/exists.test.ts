
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EuronewsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EuronewsSDK.test()
    equal(null !== testsdk, true)
  })

})
