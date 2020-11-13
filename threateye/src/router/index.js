import Vue from 'vue'
import Router from 'vue-router'

const Layout = resolve => require(['@/components/vendor/Dashboard'], resolve);
const LayoutNot = resolve => require(['@/components/vendor/DashboardNot'], resolve);
Vue.use(Router);

/**
 *
 * permission
 * nav:[1,2,3,4,5,6];
 * aside:[]
 *Among them, the first page does not need permission
 *
 * */

//所有权限通用路由表，如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  /*首页*/
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'e-nav-home',
      auth: '1'
    },
    params: {
      name: 'home'
    },
    component: Layout,
    children: [{
      path: '/home/overview',
      name: 'overview',
      meta: {
        title: '总览',
        auth: '2',
        icon: 'e-aside-overview',
        parentAuth: '1',
        rootAuth: '1',
        deep: 1
      },
      component: () => import('@/components/views/home/Overview')
    },
    {
      path: '/home/screen_index',
      name: 'screen_index',
      meta: {
        title: '大屏',
        auth: '995',
        icon: 'e-aside-big',
        parentAuth: '1',
        rootAuth: '1',
        deep: 1
      },
      redirect: '/screen'
    }]
  },
  /*告警*/
  {
    path: '/emerge',
    name: 'emerge',
    meta: {
      title: '告警',
      icon: 'e-nav-emerge',
      auth: '58'
    },
    component: Layout,
    children: [{
      path: '/emerge/network',
      name: 'network',
      meta: {
        title: '告警',
        auth: '59',
        icon: 'e-aside-network',
        parentAuth: '58',
        rootAuth: '58',
        deep: 1
      },
      component: () => import('@/components/views/emerge/Network')
    }]
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home/overview'
  },
  {
    path: '/LayoutNot',
    name: 'LayoutNot',
    meta: {
      title: '首页',
      icon: 'e-nav-home',
      auth: '1'
    },
    params: {
      name: 'home'
    },
    component: Layout,
    children: [{
      path: '/home/overview',
      name: 'overview',
      meta: {
        title: '总览',
        auth: '2',
        icon: 'e-aside-overview',
        parentAuth: '1',
        rootAuth: '1',
        deep: 1
      },
      component: () => import('@/components/views/home/Overview')
    },
    {
      path: '/home/screen_index',
      name: 'screen_index',
      meta: {
        title: '大屏',
        auth: '995',
        icon: 'e-aside-big',
        parentAuth: '1',
        rootAuth: '1',
        deep: 1
      },
      redirect: '/screen'
    }]
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '详情'
    },
    component: LayoutNot,
    children: [{
      path: '/detail/network',
      name: 'detail_network',
      meta: {
        title: '告警',
        auth: '31',
        icon: 'el-icon-picture-outline',
        parentAuth: '58',
        rootAuth: '58'
      },
      component: () => import('@/components/views/emerge/detail/detail-network')
    }
    ]
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/components/vendor/screen/Screen')
  },
  {
    path: '/screen/set',
    name:'screen_set',
    redirect: '/screen/set/top',
    component: () => import('@/components/vendor/screen/screen-set/screen-set'),
    children:[
      {
        path: '/screen/set/base',
        name: 'screen_set_base',
        query:{
          num: '0'
        },
        meta: {
          title: '基础设置',
          auth: '996',
          icon: 'e-aside-none',
          parentAuth: '995',
          rootAuth: '1',
          deep: 2
        },
        component: () => import('@/components/vendor/screen/screen-set-sup/vm-set-base.vue')
      },
      {
        path: '/screen/set_screen',
        name: 'screen_set_aside',
        query:{
          num: '1'
        },
        meta: {
          title: '顶部设置',
          auth: '996',
          icon: 'e-aside-none',
          parentAuth: '995',
          rootAuth: '1',
          deep: 2
        },
        component: () => import('@/components/vendor/screen/screen-set-sup/vm-set-screen.vue')
      },
      {
        path: '/screen/set_screen',
        name: 'screen_set_top',
        query:{
          num: '2'
        },
        meta: {
          title: '基础设置',
          auth: '996',
          icon: 'e-aside-none',
          parentAuth: '995',
          rootAuth: '1',
          deep: 2
        },
        component: () => import('@/components/vendor/screen/screen-set-sup/vm-set-screen.vue')
      }
    ]
  },
  {
    path: '/600',
    component: () => import('@/components/vendor/600')
  },
  {
    path: '/401',
    component: () => import('@/components/vendor/401')
  },
  {
    path: '*',
    component: () => import('@/components/vendor/404')
  }
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

