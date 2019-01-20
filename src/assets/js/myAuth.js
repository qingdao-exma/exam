import Cookies from './cookie.js'

const authToken = {
  // 当Token超时后采取何种策略
  // jumpAuthPage  每次请求时判断Token是否超时，若超时则跳转到授权页面
  // getNewToken  每次请求时判断Token是否超时，若超时则获取新Token (推荐)
  tokenTimeoutMethod: 'getNewToken',
  // 在Cookie中记录登录状态的key
  loginKey: 'isLogin',
  // Token是否超时
  hasToken () {
    return Cookies.get('loginInfo')
  },
  getUser () {
    return Cookies.get('username')
  },
  // 当前是否是登录状态
  isLogin () {
    return Cookies.get(this.loginKey)
  },
  // 设置Token
  setToken (token) {
    // TODO: 设置token，并填写有效期
    var maxAge = new Date(new Date().getTime() + 30 * 1000)
    Cookies.set('loginInfo', token, {
      expires: maxAge
    })
  },
  setUser (username) {
    var maxAge = new Date(new Date().getTime() + 30 * 1000)
    Cookies.set('username', username, {
      expires: maxAge
    })
  },
  // 设置登录状态
  setLoginStatus () {
    // TODO: 设置超时登录时间，在该时间范围内没有任何请求操作则自动删除
    // console.log('登录状态最长时间更新')
    var maxAge = new Date(new Date().getTime() + 30 * 60 * 1000)
    Cookies.set(this.loginKey, 'true', {
      expires: maxAge
    })
  },
  // 移除Token
  removeToken () {
    Cookies.unset('loginInfo')
  },
  removeUser () {
    Cookies.unset('username')
  },
  // 移除登录状态
  removeLoginStatus () {
    Cookies.unset(this.loginKey)
  }
}

export default authToken
