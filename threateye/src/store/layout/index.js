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
import {fetch} from "../../https";

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
    //////////////////////////////////
    LoginByUsername({
      commit
    }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {

        //loginByUsername(username, userInfo.password).then(response => {
        fetch('/static/data/user.json', userInfo)
          .then(resp => {

            let { code, data } = resp;

            //用户名和密码正确
            if(code === 0){
              setToken(data.token);
              commit('SET_TOKEN', data.token);
              resolve(true);

              //用户名密码错误
            }else {
              resolve(false);
            }
            resolve()
        }).catch(error => {
          reject(error)
        });
      });
    },

    async GetInfo({
      commit,
      dispatch
    }) {
      let auth = await axios('/static/data/auth.json');

      let roles = forRoleList(auth);

      commit('SET_ROLES', roles);

      return roles;
    },

    async LogOut({
      commit,
      dispatch
    }) {
      let auth = await axios('/static/data/layout.json');

      let roles = auth.roles;
      let token = auth.token;

      commit('SET_ROLES', roles);
      commit('SET_TOKEN', token);

      removeToken();
    },

    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data;

        const accessedRouters = formatList(asyncRouterMap, roles);

        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}
