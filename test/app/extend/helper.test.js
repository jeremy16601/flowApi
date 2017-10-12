/*
 * @Author: Joker 
 * @Date: 2017-10-12 10:36:37 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 10:54:33
 */

'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/extend/helper.test.js', () => {
  describe('validate() function test', () => {
    it('should boolean', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isBoolean(true), true)
    })
    it('should numeric', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isNumeric(10), true)
    })
    it('should string', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isString('str'), true)
    })
    it('should Function', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isFunction(function t() {}), true)
    })
    it('should Array', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isArray([]), true)
    })
    it('should Date', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isDate(new Date()), true)
    })
    it('should Error', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isError(new Error('test Error')), true)
    })
    it('should Object', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isObject({ a: 1 }), true)
    })
    it('should Empty Object', () => {
      const ctx = app.mockContext()
      assert.equal(ctx.helper.validate().isEmptyObject({}), true)
    })
  })
})
