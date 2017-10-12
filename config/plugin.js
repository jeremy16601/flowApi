/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:18:25 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-11 13:58:13
 */
'use strict'

// had enabled by egg
// exports.static = true;

module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  }
}
