'use strict'

module.exports =  {
  NODE_ENV: '"production"',
  TITLE: '"API网关"',
  BASE_API: '"http://gateway.toonyoo-inc.net:9005/api/v1"',
  ACCOUNT_API: '"http://gateway.toonyoo-inc.net:8215/account/api/v1"',
  ADMIN_API: '"http://gateway.toonyoo-inc.net:8215/admin/api/v1"',
  HYSTRIX_STREAM_API: '"http://gateway.toonyoo-inc.net:8215/mgmt/hystrix.s"',
  HYSTRIX_MONITOR_API: '"http://gateway.toonyoo-inc.net:9005/hystrix/monit"',
  OPEN_RESOURCE: '"http://gateway.toonyoo-inc.net:9005/open/attachment"',
  WEB_SOCKET: {
    TERMINAL: '"ws://gateway.toonyoo-inc.net:9005/ws/v1/terminal"'
  }
}
