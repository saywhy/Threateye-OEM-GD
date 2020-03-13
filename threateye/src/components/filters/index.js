import Vue from 'vue'

import moment from "moment"

/*Vue.filter('time',function(date){
  date = Number(date)
  if(date.length == 10){
    date = date * 1000;
  }
  date = new Date(date);
  var YYYY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YYYY + MM + DD +" "+hh + mm + ss;
});*/

Vue.filter('time',function(value){
  value = value.toString();
  if(value.length == 10){
    value = value * 1000;
  }
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
});

//威胁等级
Vue.filter('degree',function(args){
  let str = '';
  if(args == 'high'){
    str = '高危';
  }else if(args == 'medium'){
    str = '中危';
  }else if(args == 'low'){
    str = '低危';
  }
  return str;
});

//失陷确定性
Vue.filter('certainty',function(args){
  let str = '';
  if(args == 0){
    str = '未知';
  }else if(args == 1){
    str = '已失陷';
  }
  return str;
});

//处理状态(处置-资产维度)
Vue.filter('risk_status',function(args){
  let str = '';
  if(args == 1){
    str = '待处置';
  }else if(args == 2){
    str = '处置中';
  }
  return str;
});

//处理状态(告警)
Vue.filter('alert_status',function(args){
  let str = '';
  if(args == 0){
    str = '新告警';
  }else if(args == 1){
    str = '待处置';
  }else if(args == 2){
    str = '处置中';
  }else if(args == 3){
    str = '已处置';
  }else if(args == 4){
    str = '已忽略';
  }else if(args == 5){
    str = '误报';
  }
  return str;
});


//处理状态(处置-工单中心)
Vue.filter('work_status',function(args){
  let str = '';
  if(args == 0){
    str = '待分配';
  }else if(args == 1){
    str = '已分配';
  }else if(args == 2){
    str = '处置中';
  }else if(args == 3){
    str = '已处置';
  }else if(args == 4){
    str = '已取消';
  }
  return str;
});

//优先级
Vue.filter('priority',function(args){
  let str = '';
  if(args == 'highest'){
    str = '最高';
  }else if(args == 'high'){
    str = '高';
  }else if(args == 'midium'){
    str = '中';
  }else if(args == 'low'){
    str = '低';
  }
  return str;
});


