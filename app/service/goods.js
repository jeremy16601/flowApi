/*
 * @Author: Joker 
 * @Date: 2017-10-10 17:34:31 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 10:27:59
 */
'use strict'

module.exports = (app) => {
  /**
   * 商品服务类
   * 
   * @class GoodsService
   * @extends {app.Service}
   */
  class GoodsService extends app.Service {
    /**
     * 增加商品
     * 
     * @param {object} option 商品信息
     * @return {boolean} 是否添加成功
     * @member GoodsService
     */
    async add(option) {
      const result = await app.mysql.insert('goods', option)
      return result
    }
    /**
     * 获取可用商品列表
     * 
     * @param {object} option 用户编号,无就是查询所有,有的话就是查询用户的订单
     * @param {number} page 默认值[page=1] 
     * @param {number} pageSize 默认值[pageSize=30] 
     * @return {array} 返回一个数组包含查询到的数据
     * @member GoodsService
     */
    async list(option, page = 1, pageSize = 30) {
      // TODO 如果数据量大了的话要做优化,子查询 http://www.jb51.net/article/31868.htm
      const goods = await app.mysql.select('goods', {
        where: option,
        orders: [
          ['created_at', 'desc']
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize
      })
      return goods
    }
    /**
     * 获取对应编号的商品详细信息
     * 
     * @param {number} id 编号
     * @return {object} 返回对应编号的商品对象
     * @member GoodsService
     */
    async info(id) {
      const good = await app.mysql.get('goods', {
        id
      })
      return good
    }
    /**
     * 编辑商品
     * 
     * @param {object} option 更新字段及值
     * @return {boolean} 是否更新成功
     * @member GoodsService
     */
    async edit(option) {
      const result = await app.mysql.update('goods', Object.assign(option, {
        updated_at: app.mysql.literals.now
      }))
      return (result.affectedRows === 1)
    }
    /**
     * 删除一个商品(假删)
     * 
     * @param {number} id 商品编号
     * @return {boolean} 是否更新成功
     * @member GoodsService
     */
    async del(id) {
      const result = await app.mysql.update('goods', {
        id,
        isVisible: 0,
        updated_at: app.mysql.literals.now
      })
      return (result.affectedRows === 1)
    }
    /**
     * 真删
     * 
     * @param {number} id 要删除的编号
     * @return {boolean} 是否删除成功
     * @member GoodsService
     */
    async realDel(id) {
      const result = await app.mysql.delete('goods', { id })
      return (result.affectedRows === 1)
    }
  }
  return GoodsService
}
