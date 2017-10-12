/*
 * @Author: Joker 
 * @Date: 2017-10-11 15:01:11 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 09:55:50
 */
'use strict'

const { app } = require('egg-mock/bootstrap')

describe('test/app/controller/v1/goods.test.js', () => {
  describe('add() function test', () => {
    // 缺少参数
    it('body should {code:50100,info:"字段:....,错误为:....",data:null}', () => {
      const request = app.httpRequest()
        .post('/api/v1/goods')
        .type('json')
        .send({
          name: 'test'
        })
        .expect(200)
        .expect({
          code: 50100,
          info: '字段:price,错误为:missing_field',
          data: null
        })
      return request
    })

    // 添加成功
    it('body should {code=1,info="success",data=null} ', () => {
      app.mockService('goods', 'add', async() => {
        return { affectedRows: 1 }
      })
      const request = app.httpRequest()
        .post('/api/v1/goods')
        .type('json')
        .send({
          name: 'test',
          price: parseFloat(10.1),
          size: 10,
          range: 0,
          operator: '10010',
          description: 'test',
          isVisible: 1
        })
        .expect(200)
        .expect({
          code: 1,
          info: 'success',
          data: null
        })
      return request
    })

    // 添加失败
    it('body should {code=0,info="fail",data=null} ', () => {
      app.mockService('goods', 'add', async() => {
        return { affectedRows: 0 }
      })
      const request = app.httpRequest()
        .post('/api/v1/goods')
        .type('json')
        .send({
          name: 'test',
          price: parseFloat(10.1),
          size: 10,
          range: 0,
          operator: '10010',
          description: 'test',
          isVisible: 1
        })
        .expect(200)
        .expect({
          code: 0,
          info: 'fail',
          data: null
        })
      return request
    })

    // service 发生异常
    it('service Error body.code=50500', () => {
      app.mockServiceError('goods', 'add', Error('service Error'))
      const request = app.httpRequest()
        .post('/api/v1/goods')
        .type('json')
        .send({
          name: 'test',
          price: parseFloat(10.1),
          size: 10,
          range: 0,
          operator: '10010',
          description: 'test',
          isVisible: 1
        })
        .expect(200)
        .expect({
          code: 50500,
          info: 'service Error',
          data: null
        })
      return request
    })
  })

  describe('del() function test', () => {
    // 缺少参数
    it('body should {code:50100,info:"缺少编号",data:null}', () => {
      const request = app.httpRequest()
        .del('/api/v1/goods/0') // 0 会在控制器中 转换成 false , 我也不知道 为什么 /api/v1/goods/ 会报找不到路由
        .expect(200)
        .expect({
          code: 50100,
          info: '缺少编号',
          data: null
        })
      return request
    })

    // 删除成功
    it('body should {code=1,info="success",data=null} ', () => {
      app.mockService('goods', 'del', async() => {
        return true
      })
      const request = app.httpRequest()
        .del('/api/v1/goods/1')
        .expect(200)
        .expect({
          code: 1,
          info: 'success',
          data: null
        })
      return request
    })

    // 删除失败
    it('body should {code=0,info="fail",data=null} ', () => {
      app.mockService('goods', 'del', async() => {
        return false
      })
      const request = app.httpRequest()
        .del('/api/v1/goods/1')
        .expect(200)
        .expect({
          code: 0,
          info: 'fail',
          data: null
        })
      return request
    })

    // service 发生异常
    it('service Error body.code = 50500', () => {
      app.mockServiceError('goods', 'del', Error('service Error'))
      const request = app.httpRequest()
        .del('/api/v1/goods/1')
        .expect(200)
        .expect({
          code: 50500,
          info: 'service Error',
          data: null
        })
      return request
    })
  })

  describe('edit() function test', () => {
    // 缺少参数
    it('body should {code:50100,info:"缺少编号",data:null} ', () => {
      const request = app.httpRequest()
        .put('/api/v1/goods/0') // 0 会在控制器中 转换成 false , 我也不知道 为什么 /api/v1/goods/ 会报找不到路由
        .expect(200)
        .expect({
          code: 50100,
          info: '缺少编号',
          data: null
        })
      return request
    })

    // 修改成功
    it('body should {code=1,info="success",data=null} ', () => {
      app.mockService('goods', 'edit', async() => {
        return true
      })
      const request = app.httpRequest()
        .put('/api/v1/goods/1')
        .type('json')
        .send({
          name: 'edit test'
        })
        .expect(200)
        .expect({
          code: 1,
          info: 'success',
          data: null
        })
      return request
    })

    // 修改失败
    it('body should {code=0,info="fail",data=null} ', () => {
      app.mockService('goods', 'edit', async() => {
        return false
      })
      const request = app.httpRequest()
        .put('/api/v1/goods/1')
        .type('json')
        .send({
          name: 'edit test'
        })
        .expect(200)
        .expect({
          code: 0,
          info: 'fail',
          data: null
        })
      return request
    })

    // service 发生异常
    it('service Error body.code = 50500', () => {
      app.mockServiceError('goods', 'edit', Error('service Error'))
      const request = app.httpRequest()
        .put('/api/v1/goods/1')
        .expect(200)
        .expect({
          code: 50500,
          info: 'service Error',
          data: null
        })
      return request
    })
  })

  describe('getById() function test', () => {
    // 缺少参数
    it('body should {code:50100,info:"缺少编号",data:null} ', () => {
      const request = app.httpRequest()
        .get('/api/v1/goods/0') // 0 会在控制器中 转换成 false , 我也不知道 为什么 /api/v1/goods/ 会报找不到路由
        .expect(200)
        .expect({
          code: 50100,
          info: '缺少编号',
          data: null
        })
      return request
    })

    // 获取成功
    it('body should {code=1,info="success",data={name:"...",price:"...",...}} ', () => {
      const good = {
        name: 'test',
        price: 10.1,
        size: 10,
        range: 0,
        operator: '10010',
        description: 'test',
        isVisible: 1,
        created_at: Date.now(),
        updated_at: Date.now()
      }
      app.mockService('goods', 'info', async() => {
        return good
      })
      const request = app.httpRequest()
        .get('/api/v1/goods/1')
        .expect(200)
        .expect({
          code: 1,
          info: 'success',
          data: good
        })
      return request
    })

    // 查询失败
    it('body should {code=0,info="fail",data={}} ', () => {
      app.mockService('goods', 'info', async() => {
        return {}
      })
      const request = app.httpRequest()
        .get('/api/v1/goods/1')
        .expect(200)
        .expect({
          code: 1,
          info: 'success',
          data: {}
        })
      return request
    })

    // service 发生异常
    it('service Error body.code = 50500', () => {
      app.mockServiceError('goods', 'info', Error('service Error'))
      const request = app.httpRequest()
        .get('/api/v1/goods/1')
        .expect(200)
        .expect({
          code: 50500,
          info: 'service Error',
          data: null
        })
      return request
    })
  })

  describe('getByCondition() function test', () => {
    // 缺少参数
    it('body should {code:50100,info:"缺少查询条件",data:null} ', () => {
      const request = app.httpRequest()
        .get('/api/v1/goods')
        .expect(200)
        .expect({
          code: 50100,
          info: '缺少查询条件',
          data: null
        })
      return request
    })

    // 获取成功
    it('body should {code=1,info="success",data=[{name:"...",price:"...",...}},...] ', () => {
      const goods = [{
        name: 'test',
        price: 10.1,
        size: 10,
        range: 0,
        operator: '10010',
        description: 'test',
        isVisible: 1,
        created_at: Date.now(),
        updated_at: Date.now()
      }, {
        name: 'test1',
        price: 20.1,
        size: 20,
        range: 0,
        operator: '10010',
        description: 'test1',
        isVisible: 1,
        created_at: Date.now(),
        updated_at: Date.now()
      }]
      app.mockService('goods', 'list', async() => {
        return goods
      })
      const request = app.httpRequest()
        .get('/api/v1/goods')
        .query({
          page: 1,
          pageSize: 30,
          name: 'test'
        })
        .expect(200)
        .expect({
          code: 1,
          info: 'success',
          data: goods
        })
      return request
    })

    // 查询成功但是返回了一个空
    it('body should {code=1,info="success",data={}} ', () => {
      app.mockService('goods', 'list', async() => {
        return []
      })
      const request = app.httpRequest()
        .get('/api/v1/goods')
        .query({ name: 'test' })
        .expect(200)
        .expect({
          code: 1,
          info: 'success',
          data: []
        })
      return request
    })

    // service 发生异常
    it('service Error body.code = 50500', () => {
      app.mockServiceError('goods', 'list', Error('service Error'))
      const request = app.httpRequest()
        .get('/api/v1/goods')
        .query({ name: 'test' })
        .expect(200)
        .expect({
          code: 50500,
          info: 'service Error',
          data: null
        })
      return request
    })
  })
})
