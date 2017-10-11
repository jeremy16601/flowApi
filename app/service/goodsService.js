/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:34:31 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-10 17:40:54
 */
'use strict'

module.exports = (app) => {
  class GoodsService extends app.Service {
    async list() {
      const goods = await app.mysql.select('goods')
      return goods
    }
  }
  return GoodsService
}
