import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../pages/Login.vue'

import {API_TOKEN} from '@/api/apis'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',

    component: () => import('../pages/Index.vue'),
    // 二级菜单
    children: [{
        path: "/index/home",
        name: "home",
        component: () => import('../pages/Index/Home.vue')
      }, {
        path: "/index/goods",
        name: "goods",
        component: () => import('../pages/Index/Goods.vue')
      }, {
        path: "/index/shops",
        name: "shops",
        component: () => import('../pages/Index/Shops.vue')
      }, {
        path: "/index/account",
        name: "account",
        component: () => import('../pages/Index/Account.vue')
      }, {
        path: "/index/order",
        name: "order",
        component: () => import('../pages/Index/Order.vue')
      }, {
        path: "/index/salse",
        name: "salse",
        component: () => import('../pages/Index/Salse.vue')
      }, {
        //个人中心
        path: "/index/personal",
        name: "personal",
        component: () => import('../pages/Index/Personal.vue')
      },
      // 二级树菜单的下拉选项
      {
        path: "/index/goodslist",
        name: "goodslist",
        component: () => import('../pages/Index/Goods/Goodslist.vue')
      },
      {
        path: "/index/goodsadd",
        name: "goodsadd",
        component: () => import('../pages/Index/Goods/Goodsadd.vue')
      },
      {
        path: "/index/goodsub",
        name: "goodsub",
        component: () => import('../pages/Index/Goods/Goodsub.vue')
      },
      {
        path: "/index/accountlist",
        name: "accountlist",
        component: () => import('../pages/Index/Account/Accountlist.vue')
      },
      {
        path: "/index/addaccount",
        name: "addaccount",
        component: () => import('../pages/Index/Account/Addaccount.vue')
      },
      {
        path: "/index/changepwd",
        name: "changepwd",
        component: () => import('../pages/Index/Account/Changepwd.vue')
      },
      {
        path: "/index/ordersalse",
        name: "ordersalse",
        component: () => import('../pages/Index/Salse/Ordersalse.vue')
      },
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path != "/") {
    API_TOKEN(localStorage.token).then(res=>{
      if(res.data.code==0){
        next()
      }else{
        //拦截
        next('/')
      }
    })
  } else next()


})
export default router