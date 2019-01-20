
import axios from 'axios'
import Vue from 'vue'
import cookie from '@a/js/cookie.js'
const service = axios.create({
  // 请求超时时间
  timeout: 5000                 
})
service.interceptors.request.use(config => {
  // if (!cookie.get('ACCESS_TOKEN')) {
  //   location.href = '/'
  //   return
  // }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    // if (response.data.code === 600) {
    //   cookie.unset('ACCESS_TOKEN')
    //   cookie.unset('userName')
    //   new Vue().$message({
    //     message: response.data.msg,
    //     type: 'error'
    //   })
    //   setTimeout(() => {
    //     location.href = '/'
    //   }, 1000)
    //   return false
    // }
    return Promise.resolve(response)
  },
  error => {
    if (error.response) {
      // if (error.response.status !== 200) {
      //   new Vue().$message({
      //     message: error.response.data.msg,
      //     type: 'error'
      //   })
      //   location.href = '/'
      // }
      return Promise.reject(error.response.data)
    }
  }
)

export default service
