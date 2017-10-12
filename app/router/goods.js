/*
 * @Author: Joker 
 * @Date: 2017-10-12 11:16:20 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 11:16:47
 */
'use strict'

module.exports = (app) => {
  app.get('/api/v1/goods', 'v1.goods.getByCondition')
  app.get('/api/v1/goods/:id', 'v1.goods.getById')
  app.post('/api/v1/goods', 'v1.goods.add')
  app.del('/api/v1/goods/:id', 'v1.goods.del')
  app.put('/api/v1/goods/:id', 'v1.goods.edit')
}
