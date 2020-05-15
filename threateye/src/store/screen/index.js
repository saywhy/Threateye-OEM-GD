import axios from "axios";
export default {
  state: {
    //两侧数据
    asideLists:[{name: '威胁分布', flag: false, aside_id: 0},
      {name: '威胁指标热力图', flag: false, aside_id: 1},
      {name: '全球安全动态', flag: false, aside_id: 2},
      {name: '横向态势威胁', flag: true, aside_id: 3},
      {name: '分支安全', flag: true, aside_id: 4},
      {name: '系统状态监控', flag: true, aside_id: 5},
      {name: '关注告警', flag: true, aside_id: 6},
      {name: '外连国家TOP5', flag: true, aside_id: 7},
      {name: '风险趋势', flag: true, aside_id: 8},
      {name: '威胁排行', flag: false, aside_id: 9}],
    //顶部数据
    topLists: [{name:'风险资产数',alias:'risk_asset_count', flag: false, top_id: 0,count:'00000'},
      {name: '外连资产数',alias:'outreachthreat_assets_count', flag: false, top_id: 1,count:'00000'},
      {name: '告警数',alias:'alert_count', flag: false, top_id: 2,count:'00000'},
      {name: '未处理告警数',alias:'untreated_alert_count', flag: true, top_id: 3,count:'00000'},
      {name: '风险服务器数',alias:'risk_server_count', flag: true, top_id: 4,count:'00000'},
      {name: '风险终端数',alias:'risk_terminal_count', flag: true, top_id: 5,count:'00000'},
      {name: '风险网络设备数',alias:'risk_network_count', flag: true, top_id: 6,count:'00000'}]
  },
  getters: {
    asideLists: state => state.asideLists,
    topLists: state => state.topLists,
  },
  mutations: {
    SCREEN_ASIDE_LISTS: (state, args) => {
      state.asideLists = args;
    },
    //两侧
    SCREEN_ASIDE_ID_FALSE: (state, args) => {
      let lists = state.asideLists;
      lists.forEach(function (value, key) {
        if (value.aside_id == args) {
          value.flag = false;
        }
      });
      state.asideLists = lists;
    },
    SCREEN_ASIDE_ID_TRUE:(state,args) => {
      let lists = state.asideLists;
      lists.forEach(function (value, key) {
        if (value.aside_id == args) {
          value.flag = true;
        }
      });
      state.asideLists = lists;
    },

    //顶部
    SCREEN_TOP_ID_FALSE: (state, args) => {
      let lists = state.topLists;
      lists.forEach(function (value, key) {
        if (value.top_id == args) {
          value.flag = false;
        }
      });
      state.topLists = lists;
    },
    SCREEN_TOP_ID_TRUE:(state,args) => {
      let lists = state.topLists;
      lists.forEach(function (value, key) {
        if (value.top_id == args) {
          value.flag = true;
        }
      });
      state.topLists = lists;
    },
    //修改大屏中顶部数据
    SET_SCREEN_TOP:(state,args) => {
      state.topLists.filter(item => {
        item.flag = false;
        for (let i in args){
          if(item.alias == i) {
            let count = String(args[i]).padStart(5,'0');
            item.count = count;
            item.flag = true;
          }
        }
      });
    }
  },
  actions: {
    //大屏中顶部数据
    async getScreenTop({commit,dispatch},context){
      let resp = await axios('/yiiapi/demonstration/top-count',{params:context});

      let {status, data} = resp.data;

      if(status == 0){
        commit('SET_SCREEN_TOP',data);
        return true;

      }
    },
  }
}
