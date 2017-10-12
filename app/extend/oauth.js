/*
 * @Author: Joker 
 * @Date: 2017-10-11 09:48:18 
 * @Last Modified by: Joker
 * @Last Modified time: 2017-10-11 15:24:35
 */
'use strict'

module.exports = (app) => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx
    }
    async getClient(clientId, clientSecret) {
      console.log(app.config)
      console.log(clientId, clientSecret)
    }
    async getUser(jobnumber, password) {
      console.log(jobnumber, password)
    }
    async getAccessToken(bearerToken) {
      console.log(bearerToken)
    }
    async saveToken(token, client, user) {
      console.log(token, client, user)
    }
    async revokeToken(token) {
      console.log(token)
    }
    async getAuthorizationCode(authorizationCode) {
      console.log(authorizationCode)
    }
    async saveAuthorizationCode(code, client, user) {
      console.log(code, client, user)
    }
    async revokeAuthorizationCode(code) {
      console.log(code)
    }
  }
  return Model
}
