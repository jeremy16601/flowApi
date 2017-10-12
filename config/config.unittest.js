/*
 * @Author: Joker 
 * @Date: 2017-10-12 09:13:05 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 09:14:16
 */
'use strict'

module.exports = () => {
  const config = exports = {}
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
  return config
}
