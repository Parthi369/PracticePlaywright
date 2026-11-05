// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { TIMEOUT } from 'node:dns';

const config = ({
  testDir: './tests',
  timeout: 35 * 1000,

  reporter: 'html',
  expect: {
    timeout: 40 * 1000
  },
  projects: [

    {

      name: "msedge",
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: true,
        screenshot: "on",
        trace: "on"
      }
    },

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: "off",
        trace: "on"
      }
    }
  ]


});
module.exports = config