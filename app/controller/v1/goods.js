/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:18:30 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 09:50:44
 */
'use strict'

module.exports = (app) => {
  /**
   * 商品的控制器
   * 
   * @class GoodsController
   * @extends {app.Controller}
   */
  class GoodsController extends app.Controller {
    /**
     * 增加商品信息
     * 
     * @member GoodsController
     */
    async add() {
      const { ctx } = this
      const goodRule = {
        name: { type: 'string' },
        price: { type: 'number' },
        size: { type: 'int' },
        range: { type: 'int' },
        operator: { type: 'string' },
        description: { type: 'string' },
        isVisible: { type: 'int' }
      }
      try {
        ctx.validate(goodRule)
      } catch (e) {
        ctx.body = {
          code: 50100,
          info: '字段:' + e.errors[0].field + ',错误为:' + e.errors[0].code,
          data: null
        }
        return
      }
      let result
      try {
        result = await ctx.service.goods.add(ctx.request.body)
      } catch (e) {
        // TODO 错误通知
        ctx.body = {
          code: 50500,
          info: e.message,
          data: null
        }
        return
      }
      ctx.body = {
        code: (result.affectedRows === 1 ? 1 : 0),
        info: (result.affectedRows === 1 ? 'success' : 'fail'),
        data: null
      }
    }
    /**
     * 删除一个商品
     * 
     * @member GoodsController
     */
    async del() {
      let result
      const { ctx } = this
      const id = ctx.params.id
      if (!+id) {
        ctx.body = {
          code: 50100,
          info: '缺少编号',
          data: null
        }
        return
      }
      try {
        result = await ctx.service.goods.del(id)
      } catch (e) {
        // TODO 错误通知
        ctx.body = {
          code: 50500,
          info: e.message,
          data: null
        }
        return
      }
      ctx.body = {
        code: (result ? 1 : 0),
        info: (result ? 'success' : 'fail'),
        data: null
      }
    }
    /**
     * 更改商品
     * 
     * @member GoodsController
     */
    async edit() {
      let result
      const { ctx } = this
      const id = ctx.params.id
      if (!+id) {
        ctx.body = {
          code: 50100,
          info: '缺少编号',
          data: null
        }
        return
      }
      const body = ctx.request.body
      try {
        result = await ctx.service.goods.edit(Object.assign(body, {
          id
        }))
      } catch (e) {
        // TODO 错误通知
        ctx.body = {
          code: 50500,
          info: e.message,
          data: null
        }
        return
      }
      ctx.body = {
        code: (result ? 1 : 0),
        info: (result ? 'success' : 'fail'),
        data: null
      }
    }
    /**
     * 根据编号获取商品详细信息
     * 
     * @member GoodsController
     */
    async getById() {
      let good
      const { ctx } = this
      const id = ctx.params.id
      if (!+id) {
        ctx.body = {
          code: 50100,
          info: '缺少编号',
          data: null
        }
        return
      }
      try {
        good = await ctx.service.goods.info(id)
      } catch (e) {
        // TODO 错误通知
        ctx.body = {
          code: 50500,
          info: e.message,
          data: null
        }
        return
      }
      ctx.body = {
        code: (good ? 1 : 0),
        info: (good ? 'success' : 'fail'),
        data: (good ? good : null)
      }
    }
    /**
     * 根据查询条件来查询数据
     * 
     * @member GoodsController
     */
    async getByCondition() {
      let goods
      const { ctx } = this
      const condition = ctx.query
      if (condition && ctx.helper.validate().isEmptyObject(condition)) {
        ctx.body = {
          code: 50100,
          info: '缺少查询条件',
          data: null
        }
        return
      }
      try {
        goods = await ctx.service.goods.list(condition)
      } catch (e) {
        // TODO 错误通知
        ctx.body = {
          code: 50500,
          info: e.message,
          data: null
        }
        return
      }
      ctx.body = {
        code: (goods ? 1 : 0),
        info: (goods ? 'success' : 'fail'),
        data: (goods ? goods : null)
      }
    }
  }
  return GoodsController
}
