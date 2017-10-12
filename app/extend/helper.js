/*
 * @Author: Joker 
 * @Date: 2017-10-11 17:28:33 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-12 11:04:25
 */
'use strict'

module.exports = {
  /**
   * 类型检测
   * 
   * @return {object} 返回一个实例对象,包含各种方法
   */
  validate() {
    const class2type = {}
    const toString = class2type.toString
    const typeStr = 'Boolean Number String Function Array Date RegExp Object Error Null'
    typeStr.split(' ').forEach((val) => {
      class2type['[object ' + val + ']'] = val.toLowerCase()
    })

    class Joker {
      isBoolean(val) {
        return class2type[toString.call(val)] === 'boolean'
      }
      isNumeric(val) {
        const number = Number(val),
          type = typeof val
        return (val != null && type !== 'boolean' && (type !== 'string' || val.length) && !isNaN(number) && isFinite(number)) || false
      }
      isString(val) {
        return class2type[toString.call(val)] === 'string'
      }
      isFunction(o) {
        return class2type[toString.call(o)] === 'function'
      }
      isArray(o) {
        return class2type[toString.call(o)] === 'array'
      }
      isDate(o) {
        return class2type[toString.call(o)] === 'date'
      }
      isError(o) {
        return class2type[toString.call(o)] === 'error'
      }
      isObject(o) {
        return class2type[toString.call(o)] === 'object'
      }
      isEmptyObject(o) {
        let name
        for (name in o) return false
        return true
      }
    }
    return new Joker()
  }
}
