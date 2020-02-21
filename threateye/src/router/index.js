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
export const constantRouterMap = [{
    path: '/login',
    name: 'login',
    component: () => import('@/components/vendor/login/Login')
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/main_content',
    children: [{
      path: '/main_content',
      name: 'main_content',
      component: () => import('@/components/layout/Main')
    }]
  },
  {
    path: '/LayoutNot',
    name: 'LayoutNot',
    meta: {
      title: '通知',
      icon: 'el-icon-help'
    },
    component: LayoutNot,
    children: [{
      path: '/message',
      name: 'message',
      meta: {
        title: '通知',
        auth: '',
        icon: 'el-icon-help',
        parentAuth: ''
      },
      component: () => import('@/components/vendor/Message')
    }, ]
  },
  /***
   *
   * ******************************详情此处后面需要加上权限，现在是临时配置******************************
   *
   * **/
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '详情'
    },
    component: LayoutNot,
    children: [
      {
        path: '/detail/network',
        name: 'detail_network',
        meta: {
          title: '网站告警',
          auth: '31',
          icon: 'el-icon-picture-outline',
          parentAuth: '3',
          rootAuth: '3'
        },
        component: () => import('@/components/views/emerge/detail/detail-network')
      },
      {
        path: '/detail/terminal',
        name: 'detail_terminal',
        meta: {
          title: '端点告警',
          auth: '32',
          icon: 'el-icon-picture-outline',
          parentAuth: '3',
          rootAuth: '3'
        },
        component: () => import('@/components/views/emerge/detail/detail-terminal')
      },
      {
        path: '/detail/journal',
        name: 'detail_journal',
        meta: {
          title: '日志告警',
          auth: '33',
          icon: 'el-icon-picture-outline',
          parentAuth: '3',
          rootAuth: '3'
        },
        component: () => import('@/components/views/emerge/detail/detail-journal')
      },
      {
        path: '/detail/computer',
        name: 'detail_computer',
        meta: {
          title: '计算机详情',
          auth: '32',
          icon: 'el-icon-picture-outline',
          parentAuth: '3',
          rootAuth: '3'
        },
        component: () => import('@/components/views/emerge/detail/detail-computer')
      },
      {
        path: '/detail/assets',
        name: 'detail_assets',
        meta: {
          title: '风险资产详情',
          auth: '21',
          icon: 'el-icon-picture-outline',
          parentAuth: '2',
          rootAuth: '2'
        },
        component: () => import('@/components/views/handle/detail/detail-assets')
      },
      {
        path: '/detail/works',
        name: 'detail_works',
        meta: {
          title: '工单详情',
          auth: '23',
          icon: 'el-icon-picture-outline',
          parentAuth: '2',
          rootAuth: '2'
        },
        component: () => import('@/components/views/handle/detail/detail-works')
      },
    ]
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

//异步挂载的路由，动态需要根据权限加载的路由表
export const asyncRouterMap = [
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
          auth: '11',
          icon: 'e-aside-overview',
          parentAuth: '1',
          rootAuth: '1',
          deep: 1
        },
        component: () => import('@/components/views/home/Overview')
      },
      {
        path: '/home/screen',
        name: 'screen',
        meta: {
          title: '大屏',
          auth: '12',
          icon: 'e-aside-screen',
          parentAuth: '1',
          rootAuth: '1',
          deep: 1
        },
        component: () => import('@/components/views/home/Screen')
      }
    ]
  },
  /*处置*/
  {
    path: '/handle',
    name: 'handle',
    meta: {
      title: '处置',
      icon: 'e-nav-handle',
      auth: '2',
      role: ['admin']
    },
    component: Layout,
    children: [{
        path: '/handle/assets',
        name: 'assets',
        meta: {
          title: '资产维度',
          auth: '21',
          icon: 'e-aside-assets',
          parentAuth: '2',
          rootAuth: '2',
          deep: 1
        },
        component: () => import('@/components/views/handle/Assets')
      },
      {
        path: '/handle/risks',
        name: 'risks',
        meta: {
          title: '风险维度',
          auth: '22',
          icon: 'e-aside-risks',
          parentAuth: '2',
          rootAuth: '2',
          deep: 1
        },
        component: () => import('@/components/views/handle/Risks'),
        children: [{
            path: '/handle/risks/outside',
            name: 'outside',
            meta: {
              title: '外部威胁',
              auth: '221',
              icon: 'e-aside-none',
              parentAuth: '22',
              rootAuth: '2',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Outside')
          },
          {
            path: '/handle/risks/local',
            name: 'local',
            meta: {
              title: '本机威胁',
              auth: '222',
              icon: 'e-aside-none',
              parentAuth: '22',
              rootAuth: '2',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Local')
          },
          {
            path: '/handle/risks/lateral',
            name: 'lateral',
            meta: {
              title: '横向威胁',
              auth: '223',
              icon: 'e-aside-none',
              parentAuth: '22',
              rootAuth: '2',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Lateral')
          },
          {
            path: '/handle/risks/outreath',
            name: 'outreath',
            meta: {
              title: '外联威胁',
              auth: '224',
              icon: 'e-aside-none',
              parentAuth: '22',
              rootAuth: '2',
              deep: 2
            },
            component: () => import('@/components/views/handle/risks/Outreath')
          }
        ]
      },
      {
        path: '/handle/works',
        name: 'works',
        meta: {
          title: '工单中心',
          auth: '23',
          icon: 'e-aside-works',
          parentAuth: '2',
          rootAuth: '2',
          deep: 1
        },
        component: () => import('@/components/views/handle/Works')
      }
    ]
  },
  /*告警*/
  {
    path: '/emerge',
    name: 'emerge',
    meta: {
      title: '告警',
      icon: 'e-nav-emerge',
      auth: '3'
    },
    component: Layout,
    children: [{
        path: '/emerge/network',
        name: 'network',
        meta: {
          title: '网站告警',
          auth: '31',
          icon: 'e-aside-network',
          parentAuth: '3',
          rootAuth: '3',
          deep: 1
        },
        component: () => import('@/components/views/emerge/Network')
      }
    ]
  },
  /*追查*/
  {
    path: '/invest',
    name: 'invest',
    meta: {
      title: '追查',
      icon: 'e-nav-invest',
      auth: '4'
    },
    component: Layout,
    children: [{
        path: '/invest/dns',
        name: 'dns',
        meta: {
          title: 'DNS追查',
          auth: '41',
          icon: 'e-aside-dns',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/Dns')
      },
      {
        path: '/invest/url',
        name: 'url',
        meta: {
          title: 'IP/URL追查',
          auth: '42',
          icon: 'e-aside-url',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/Url')
      },
      {
        path: '/invest/host',
        name: 'host',
        meta: {
          title: '主机追查',
          auth: '43',
          icon: 'e-aside-host',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/Host')
      },
      {
        path: '/invest/user',
        name: 'user',
        meta: {
          title: '用户追查',
          auth: '44',
          icon: 'e-aside-user',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/User')
      },
      {
        path: '/invest/file',
        name: 'file',
        meta: {
          title: '文件追查',
          auth: '45',
          icon: 'e-aside-file',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/File')
      },
      {
        path: '/invest/data',
        name: 'data',
        meta: {
          title: '数据传输追查',
          auth: '47',
          icon: 'e-aside-data',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/Data')
      },
      {
        path: '/invest/flow',
        name: 'flow',
        meta: {
          title: '流量方向追查',
          auth: '48',
          icon: 'e-aside-flow',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/Flow')
      },
      {
        path: '/invest/ioc',
        name: 'ioc',
        meta: {
          title: 'IOC扫描器',
          auth: '49',
          icon: 'e-aside-ioc',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/Ioc')
      },
      {
        path: '/invest/sandbox',
        name: 'sandbox',
        meta: {
          title: '沙箱',
          auth: '150',
          icon: 'e-aside-ioc',
          parentAuth: '4',
          rootAuth: '4',
          deep: 1
        },
        component: () => import('@/components/views/invest/sandbox')
      }
    ]
  },
  /*报表*/
  {
    path: '/report',
    name: 'report',
    meta: {
      title: '报表',
      icon: 'e-nav-report',
      auth: '5'
    },
    component: Layout,
    children: [{
        path: '/report/create',
        name: 'create',
        meta: {
          title: '报表生成',
          auth: '51',
          icon: 'e-aside-create',
          parentAuth: '5',
          rootAuth: '5',
          deep: 1
        },
        component: () => import('@/components/views/report/Create')
      },
      {
        path: '/report/sending',
        name: 'sending',
        meta: {
          title: '报表发送',
          auth: '52',
          icon: 'e-aside-sending',
          parentAuth: '5',
          rootAuth: '5',
          deep: 1
        },
        component: () => import('@/components/views/report/Sending')
      }
    ]
  },
  /*系统*/
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统',
      icon: 'e-nav-system',
      auth: '6'
    },
    component: Layout,
    children: [{
        path: '/system/setting/manage',
        name: 'manage',
        meta: {
          title: '设备管理',
          auth: '61',
          icon: 'e-aside-sign',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Manage')
      },
      {
        path: '/system/setting/monitor',
        name: 'monitor',
        meta: {
          title: '受监控IP',
          auth: '62',
          icon: 'e-aside-assets',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Monitor')
      },
      {
        path: '/system/setting/account',
        name: 'account',
        meta: {
          title: '账号管理',
          auth: '63',
          icon: 'e-aside-works',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Account')
      },
      {
        path: '/system/setting/electric',
        name: 'electric',
        meta: {
          title: '网络配置',
          auth: '64',
          icon: 'e-aside-network',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Electric')
      },
      {
        path: '/system/setting/option',
        name: 'option',
        meta: {
          title: '系统选项',
          auth: '65',
          icon: 'e-aside-terminal',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Option')
      },
      {
        path: '/system/setting/rule',
        name: 'rule',
        meta: {
          title: '规则库及白名单',
          auth: '66',
          icon: 'e-aside-journal',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Rule')
      },
      {
        path: '/system/setting/react',
        name: 'react',
        meta: {
          title: '联动',
          auth: '67',
          icon: 'e-aside-dns',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/React')
      },
      {
        path: '/system/setting/threat',
        name: 'threat',
        meta: {
          title: '威胁通知',
          auth: '68',
          icon: 'e-aside-user',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Threat')
      },
      {
        path: '/system/setting/record',
        name: 'record',
        meta: {
          title: '日志',
          auth: '69',
          icon: 'e-aside-data',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Record')
      },
      {
        path: '/system/setting/resume',
        name: 'resume',
        meta: {
          title: '恢复/重启',
          auth: '610',
          icon: 'e-aside-flow',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Resume')
      },
      {
        path: '/system/setting/licence',
        name: 'licence',
        meta: {
          title: '许可证',
          auth: '611',
          icon: 'e-aside-ioc',
          parentAuth: '6',
          rootAuth: '6',
          deep: 1
        },
        component: () => import('@/components/views/system/setting/Licence')
      }
    ]
  }
]
