

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EuronewsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('NewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when EURONEWS_TEST_LIVE=TRUE.
  afterEach(liveDelay('EURONEWS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EuronewsSDK.test()
    const ent = testsdk.New()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.EURONEWS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'new.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Category of the news (e.g., economy, politics, diplomacy)","t":"`$STRING`","key$":"category","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Brief description or summary of the article","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the news article","t":"`$STRING`","key$":"id","index$":2},"publishedAt":{"a":true,"fo":"date-time","h":"Published At","n":"publishedAt","r":false,"sh":"Publication date and time","t":"`$STRING`","key$":"publishedAt","index$":3},"thumbnail":{"a":true,"fo":"uri","h":"Thumbnail","n":"thumbnail","r":false,"sh":"Thumbnail image URL","t":"`$STRING`","key$":"thumbnail","index$":4},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the news article","t":"`$STRING`","key$":"title","index$":5},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the full article","t":"`$STRING`","key$":"url","index$":6},"videoUrl":{"a":true,"fo":"uri","h":"Video Url","n":"videoUrl","r":false,"sh":"URL to video content if available","t":"`$STRING`","key$":"videoUrl","index$":7}},"id":{"field":"id","name":"id"},"name":"new","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /breaking-news.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/breaking-news.json","q":{},"r":{},"s":[{"lit":"breaking-news.json"}],"t":{"req":"`reqdata`","res":"`body.articles`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"new","name__orig":"new","Name":"New","name_":"new","name-":"new","NAME":"NEW","index$":0}, {"active":true,"entity":"new","key$":"BasicNewFlow","kind":"basic","name":"BasicNewFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"new_ref01"}}],"index$":0}]}, 'New', {"GET /breaking-news.json":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let new_ref01_data = Object.values(setup.data.existing.new)[0] as any

    // LIST
    const new_ref01_ent = client.New()
    const new_ref01_match: any = {}

    const new_ref01_list = (await new_ref01_ent.list(new_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/new/NewTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EuronewsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['new01','new02','new03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'EURONEWS_TEST_NEW_ENTID': idmap,
    'EURONEWS_TEST_LIVE': 'FALSE',
    'EURONEWS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['EURONEWS_TEST_NEW_ENTID']

  const live = 'TRUE' === env.EURONEWS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['EURONEWS_TEST_NEW_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EuronewsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.EURONEWS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
