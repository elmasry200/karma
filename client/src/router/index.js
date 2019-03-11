import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/LoginSystem/Register'
import Login from '@/components/LoginSystem/Login'
import Activate from '@/components/LoginSystem/Activate'
import ForgetPassword from '@/components/LoginSystem/ForgetPassword'
import ResetPassword from '@/components/LoginSystem/ResetPassword'
import test from '@/components/test'
import conversation from '@/components/conversation'
import Levels from '@/components/Levels'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/activate/:id',
      name: 'activate',
      component: Activate
    },
    {
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/ResetPassword/:id',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/conversation',
      name: 'conversation',
      component: conversation
    },
    {
      path: '/levels',
      name: 'levels',
      component: Levels
    }
  ]
})
