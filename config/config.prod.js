/*
 * @Author: Joker 
 * @Date: 2017-10-11 08:49:04 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-11 08:50:12
 */
'use strict'
const path = require('path')

module.exports = {
  logger: { // 生产环境 log 日志存放位置
    dir: path.join(__dirname, '../logs')
  }
}
