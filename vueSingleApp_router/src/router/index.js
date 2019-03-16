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
  base: process.env.BASE_URL, //基路径:默认值为'/'.如果整个单页应用在/app/下,base就应该设为'/app/'.一般可以写成__dirname,在webpack中配置.
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
          component: () => import( /* webpackChunkName: "list" */ '@/components/List'), //路由懒加载
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
