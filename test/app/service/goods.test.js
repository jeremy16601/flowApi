/*
 * @Author: Joker 
 * @Date: 2017-10-12 08:52:24 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 10:35:30
 */

'use strict'
const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/service/goods.test.js', () => {
  describe('add() function test', () => {
    // 添加成功
    it('should return true', async() => {
      const ctx = app.mockContext()
      const result = await ctx.service.goods.add({
        name: 'test',
        description: 'unit_test'
      })
      assert.equal(result.affectedRows, 1)
      await app.mysql.delete('goods', { id: result.insertId })
    })

    // 发生异常
    it('throw Error because no field', async() => {
      const ctx = app.mockContext()
      try {
        await ctx.service.goods.add()
      } catch (e) {
        assert(e)
      }
    })
  })

  describe('del() function test', () => {
    // 假删成功
    it('should return true', async() => {
      const ctx = app.mockContext()
      const good = await app.mysql.insert('goods', { name: 'test', description: 'unit_test' })
      assert.equal(good.affectedRows, 1)
      const goodId = good.insertId
      // 真正的假删
      const result = await ctx.service.goods.del(goodId)
      assert.equal(result, true)
      // 最后删除这个数据
      await app.mysql.delete('goods', { id: goodId })
    })

    // 假删失败
    it('del fail because no this goodId', async() => {
      const ctx = app.mockContext()
      const result = await ctx.service.goods.del(0)
      assert.equal(result, false)
    })

    // 发生异常
    it('throw Error because no id', async() => {
      const ctx = app.mockContext()
      try {
        await ctx.service.goods.del()
      } catch (e) {
        assert(e)
      }
    })
  })

  describe('edit() function test', () => {
    // 修改成功
    it('should return true', async() => {
      const ctx = app.mockContext()
      const good = await app.mysql.insert('goods', { name: 'test', description: 'unit_test' })
      assert.equal(good.affectedRows, 1)
      const goodId = good.insertId
      const result = await ctx.service.goods.edit({ id: goodId, name: 'just_test' })
      assert.equal(result, true)
      const good_edit = await app.mysql.get('goods', { id: goodId })
      assert.equal(good_edit.name, 'just_test')
      // 最后删除这个数据
      await app.mysql.delete('goods', { id: goodId })
    })

    // 修改失败
    it('update fail because no this goodId', async() => {
      const ctx = app.mockContext()
      const result = await ctx.service.goods.edit({ id: 0 })
      assert.equal(result, false)
    })

    // 发生异常
    it('throw Error because no field', async() => {
      const ctx = app.mockContext()
      try {
        await ctx.service.goods.edit()
      } catch (e) {
        assert(e)
      }
    })
  })

  describe('info() function test', () => {
    // 获取成功
    it('should return good Object', async() => {
      const ctx = app.mockContext()
      const good = await app.mysql.insert('goods', { name: 'test', description: 'unit_test_info' })
      assert.equal(good.affectedRows, 1)
      const goodId = good.insertId
      const result = await ctx.service.goods.info(goodId)
      assert.equal(result.name, 'test')
      assert.equal(result.description, 'unit_test_info')
      // 最后删除这个数据
      await app.mysql.delete('goods', { id: goodId })
    })

    // 获取失败
    it('get fail because no this goodId', async() => {
      const ctx = app.mockContext()
      const result = await ctx.service.goods.info(0)
      assert.equal(result, null)
    })

    // 发生异常
    it('throw Error because no field', async() => {
      const ctx = app.mockContext()
      try {
        await ctx.service.goods.info()
      } catch (e) {
        assert(e)
      }
    })
  })

  describe('list() function test', () => {
    // 获取成功
    it('should return goods Object Array', async() => {
      const ctx = app.mockContext()
      const good1 = await app.mysql.insert('goods', { name: 'WTF_test', description: 'unit_test_info' })
      const good2 = await app.mysql.insert('goods', { name: 'WTF_test', description: 'unit_test_info' })
      assert.equal(good1.affectedRows, 1)
      assert.equal(good2.affectedRows, 1)
      const result = await ctx.service.goods.list({ name: 'WTF_test' })
      assert.equal(result.length, 2)
      // 最后删除这个数据
      await app.mysql.delete('goods', { id: good1.insertId })
      await app.mysql.delete('goods', { id: good2.insertId })
    })

    // 获取失败
    it('get fail because no this good', async() => {
      const ctx = app.mockContext()
      const result = await ctx.service.goods.list({ name: 'abc' })
      assert.deepStrictEqual(result, [])
    })

    // 发生异常
    it('throw Error because no field', async() => {
      const ctx = app.mockContext()
      try {
        await ctx.service.goods.list()
      } catch (e) {
        assert(e)
      }
    })
  })

  describe('realDel() function test', () => {
    // 删除成功
    it('should return true', async() => {
      const ctx = app.mockContext()
      const good = await app.mysql.insert('goods', { name: 'realDel_test', description: 'unit_test_info' })
      assert.equal(good.affectedRows, 1)
      const result = await ctx.service.goods.realDel(good.insertId)
      assert.equal(result, true)
      const good_get = await app.mysql.get('goods', { id: good.insertId })
      assert.deepStrictEqual(good_get, null)
    })

    // 删除失败
    it('delete fail because no this goodId', async() => {
      const ctx = app.mockContext()
      const result = await ctx.service.goods.realDel(0)
      assert.equal(result, false)
    })

    // 发生异常
    it('throw Error because no field', async() => {
      const ctx = app.mockContext()
      try {
        await ctx.service.goods.realDel()
      } catch (e) {
        assert(e)
      }
    })
  })
})
