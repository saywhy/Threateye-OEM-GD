import Vue from 'vue'
Vue.filter('time',function(date){
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
});

Vue.filter('dispose',function(args){
  let str = '待处理';
  if(args == 1){
    str = '待处理';
  }else if(args == 2){
    str = '处置中';
  }else if(args == 3){
    str = '已忽略';
  }else if(args == 4){
    str = '误报';
  }else if(args == 5){
    str = '已处置';
  }
  return str;
});
