/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:18:20 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-11 08:49:53
 */
'use strict'

module.exports = (appInfo) => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1507623645748_276'
  // mysql
  config.mysql = {
    client: {
      host: '594e17250df88.sh.cdb.myqcloud.com',
      port: '11820',
      user: 'cdb_outerroot',
      password: 'lixueqing1127##',
      database: 'luojiStore'
    }
  }

  // add your config here
  config.middleware = []

  return config
}
