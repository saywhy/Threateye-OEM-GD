import axios from "axios";

import {
  asyncRouterMap,
  constantRouterMap
} from "@/router";
import {
  getToken,
  setToken,
  removeToken
} from "./cookie";
import {
  forRoleList,
  formatList
} from './auth'
import {
  fetch
} from "../../https/api";

export default {
  state: {
    highligh: {
      navIndex: '0',
      asideIndex: '0'
    },
    routers: constantRouterMap,
    addRouters: [],
    token: getToken(),
    roles: [],
    isCollapse: false,
    sysMonitor: false
  },
  getters: {
    token: state => state.token,
    roles: state => state.roles,
    addRouters: state => state.addRouters,
    sysMonitor: state => state.sysMonitor
  },
  mutations: {
    SET_TOKEN: (state, args) => {
      state.token = args;
    },

    SET_ROLES: (state, args) => {
      state.roles = args;
    },

    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },

    TOGGLE_COLLAPSE: (state, args) => {
      state.isCollapse = args;
    },
    CHANGE_SYS: (state, args) => {
      state.sysMonitor = args;
    },
  },
  actions: {
    //登录
    LoginByUsername({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        //只要登录就删除token
        removeToken();
        axios.post('/yiiapi/site/login', {
          "LoginForm": userInfo,
          "login-button": ""
        }).then(resp => {

          console.log(resp)

          let datas = resp.data;

          console.log(datas)

          let {status, msg, data} = datas;

          let tips = '输入用户名或密码错误';
          if (msg.username) {
            tips = msg.username[0];
          } else if (msg.password) {
            tips = msg.password[0];
          } else if(msg.allow_ip) {
            tips = msg.allow_ip;
          }else {
            tips = msg;
          }
          //用户名密码正确
          if (status == 202 || status == 0) {
            let isTaken = (data == '') ? userInfo.username : data.token
            setToken(isTaken);
            commit('SET_TOKEN', isTaken);
            resolve([true, tips]);
            //用户名密码错误
          } else {
            resolve([false, tips]);
          }
        }).catch(error => {
          console.log(error);
        })
      });
    },

    //权限设置
    async GetAuth({
      commit,
      dispatch
    }) {
      try {
        //测试数据
        //let resp = await axios('/static/data/auth.json');
        //真实数据
        let resp = await axios('/yiiapi/site/menu');

        let roles = forRoleList(resp);

        // console.log(roles);
        commit('SET_ROLES', roles);
        return roles;

      }catch (err) {
        console.log(err);
      }

    },

    async LogOut({
      commit,
      dispatch
    }) {
      try{
        let resp = await axios('/yiiapi/site/logout');
        let {status,msg,data} = resp.data;

        if(status == 0){
          commit('SET_ROLES', []);
          commit('SET_TOKEN', data);
          removeToken();
        }
      }catch (err) {
        console.log(err);
      }

    },

    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data;

        // console.log(roles)
        const accessedRouters = formatList(asyncRouterMap, roles);

        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}
