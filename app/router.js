/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:44:21 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-10 17:45:19
 */
'use strict'

module.exports = (app) => {
  app.get('/', 'v1.goods.list')
}
