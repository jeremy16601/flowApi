/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:44:21 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-11 15:00:03
 */
'use strict'

module.exports = (app) => {
  app.get('/api/v1/goods', 'v1.goods.getByCondition')
  app.get('/api/v1/goods/:id', 'v1.goods.getById')
  app.post('/api/v1/goods', 'v1.goods.add')
  app.del('/api/v1/goods/:id', 'v1.goods.del')
  app.put('/api/v1/goods/:id', 'v1.goods.edit')
}
