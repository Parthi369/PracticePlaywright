// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { TIMEOUT } from 'node:dns';

const config =({
  testDir: './tests',
  timeout: 35*1000,
  
  reporter : 'html',
  expect: {
    timeout : 40*1000
},
//retries:1,
//workers:10,

  use: {
    browserName :'chromium',
    channel: 'chrome',
    headless :true,
    //slowMo: 10000
    screenshot:"on",
    //trace: "retain-on-failure"
    trace: "on",
    //ignoreHTTPErrors: true,
    //permission:['geolocation'],
    //video:'retain-on-failure',
    //viewport:{width:1080,height:480}
    //...devices["Galaxy S24"]

  }

});
module.exports = config