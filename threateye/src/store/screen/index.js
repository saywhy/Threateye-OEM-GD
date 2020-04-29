import axios from "axios";
export default {
  state: {
    asideLists:[{name: '威胁分布', flag: false, aside_id: 0},
      {name: '关注告警', flag: true, aside_id: 1},
      {name: '风险趋势', flag: true, aside_id: 2},
      {name: '全球安全动态', flag: true, aside_id: 3},
      {name: '分支安全', flag: false, aside_id: 4},
      {name: '威胁指标热力图', flag: true, aside_id: 5},
      {name: '外连国家TOP5', flag: false, aside_id: 6},
      {name: '威胁排行', flag: false, aside_id: 7},
      {name: '横向态势威胁', flag: false, aside_id: 8},
      {name: '系统监控状态', flag: false, aside_id: 9}]
  },
  getters: {
    asideLists: state => state.asideLists,
  },
  mutations: {
    SCREEN_ASIDE_LISTS: (state, args) => {
      console.log(args)
      state.asideLists = args;
    },
    SCREEN_ASIDE_FLAG:(state,args) => {
      let lists = state.asideLists;
      lists.forEach(function (value, key) {
        if (value.aside_id == args) {
          value.flag = true;
        }
      });
      state.asideLists = lists;
    }
  },
  actions: {
    //大屏两侧数据列表
    /*screen_aside_lists ({commit},args) {
      commit('SCREEN_ASIDE_LISTS',args);
    }*/
  }
}
