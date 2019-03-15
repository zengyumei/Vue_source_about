import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Add from '@/components/Add'
import User from '@/components/User'

// 1. 插件
// 安装 <router-view> and <router-link> 组件
// 且给当前应用下所有的组件都注入 $router and $route 对象
Vue.use(Router)

// 3. 创建 VueRouter 实例 router
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'list',
          name: 'list',
          component: () => import( /* webpackChunkName: "list" */ '@/components/List'),
        },
        {
          path: 'user',
          name: 'user',
          component: () => import( /* webpackChunkName: "user" */ '@/components/User'),
        },
      ]
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/user',
      name: 'user2',
      components: {
        default: User,
        a: Login,
        b: Home      
      }
    },
  ]
})
