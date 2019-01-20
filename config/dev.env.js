'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TITLE: '"DevOps开发版"',
  BASE_API: '"http://localhost:9005/api/v1"',
  ACCOUNT_API: '"http://10.200.11.16:8215/account/api/v1"',
  ADMIN_API: '"http://10.200.11.16:8215/admin/api/v1"',
  HYSTRIX_STREAM_API: '"http://localhost:8215/mgmt/hystrix.s"',
  HYSTRIX_MONITOR_API: '"http://localhost:9005/hystrix/monit"',
  OPEN_RESOURCE: '"http://localhost:9005/open/attachment"',
  WEB_SOCKET: {
    TERMINAL: '"ws://localhost:9005/ws/v1/terminal"'
  }
})
