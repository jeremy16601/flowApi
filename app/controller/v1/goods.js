/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:18:30 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-10 17:44:15
 */
'use strict'

module.exports = (app) => {
  class GoodsController extends app.Controller {
    async list() {
      const {
        ctx
      } = this

      const goods = await ctx.service.goodsService.list()
      ctx.body = goods
    }
  }
  return GoodsController
}
