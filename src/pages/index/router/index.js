import Vue from 'vue'
import Router from 'vue-router'
import cookie from '@a/js/cookie.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const index = (resolve) => { require(['../views/index.vue'], resolve) }
const baoming = (resolve) => { require(['../views/baoming.vue'], resolve) }
const examlogin = (resolve) => { require(['../views/examlogin.vue'], resolve) }
const exam = (resolve) => { require(['../views/exam.vue'], resolve) }

NProgress.configure({ showSpinner: false })
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/baoming',
      name: 'baoming',
      component: baoming
    },
    {
      path: '/examlogin',
      name: 'examlogin',
      component: examlogin
    },
    {
      path: '/exam',
      name: 'exam',
      component: exam
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  NProgress.done()
  if (cookie.get('ACCESS_TOKEN')) {
    next()
  } else {
    if (to.path !== '/') {
      next({name: 'index', replace: true})
    } else {
      next()
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default router
