import Vue from 'vue'

import moment from "moment"

Vue.filter('time', function (value) {
  if (value) {
    value = value.toString();
    if (value.length == 10) {
      value = value * 1000;
    }
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }

});

Vue.filter('degree_sino', function (args) {
  let str = '';
  if (args == '高') {
    str = '高危';
  } else if (args == '中') {
    str = '中危';
  } else if (args == '低') {
    str = '低危';
  }
  return str;
});

//威胁等级
Vue.filter('degree', function (args) {
  let str = '';
  if (args == 'high') {
    str = '高危';
  } else if (args == 'medium') {
    str = '中危';
  } else if (args == 'low') {
    str = '低危';
  }
  return str;
});

//失陷确定性
Vue.filter('certainty', function (args) {
  args += ''
  let str = '';
  if (args == '0') {
    str = '';
  } else if (args == '1') {
    str = '已失陷';
  }
  return str;
});

//处理状态(处置-资产维度)
Vue.filter('risk_status', function (args) {
  args += ''
  let str = '';
  if (args == '1') {
    str = '待处置';
  } else if (args == '2') {
    str = '处置中';
  } else if (args == '3') {
    str = '已处置'
  } else if (args == '4') {
    str = '已忽略';
  } else if (args == '5') {
    str = '误报';
  }
  return str;
});

//处理状态(告警)
Vue.filter('alert_status', function (args) {
  args += ''
  let str = '';
  if (args == '0') {
    str = '新告警';
  } else if (args == '1') {
    str = '待处置';
  } else if (args == '2') {
    str = '处置中';
  } else if (args == '3') {
    str = '已处置';
  } else if (args == '4') {
    str = '已忽略';
  } else if (args == '5') {
    str = '误报';
  }
  return str;
});


//处理状态(处置-工单中心)
Vue.filter('work_status', function (args) {
  //console.log(args);
  args += ''
  let str = '';
  switch (args) {
    case '':
      str = '未关联工单';
      break;
    case '0':
      str = '待分配';
      break;
    case '1':
      str = '已分配';
      break;
    case '2':
      str = '处置中';
      break;
    case '3':
      str = '已处置';
      break;
    case '4':
      str = '已取消';
      break;
    default:
      break;
  }
  return str;
});

//优先级
Vue.filter('priority', function (args) {
  let str = '';
  if (args == 'highest') {
    str = '最高';
  } else if (args == 'high') {
    str = '高';
  } else if (args == 'medium') {
    str = '中';
  } else if (args == 'low') {
    str = '低';
  }
  return str;
});
//优先级
Vue.filter('priorityColor', function (args) {
  let str = '';
  if (args == 'highest') {
    str = '#dc5f5f';
  } else if (args == 'high') {
    str = '#e0c840';
  } else if (args == 'medium') {
    str = '#5389e0';
  } else if (args == 'low') {
    str = '#47cad9';
  }
  return str;
});

Vue.filter('filterType', function (args) {
  if (args == '') return;
  if (args == undefined) return;
  if (args == 0) return '0B';
  var k = 1024;
  var size = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(args) / Math.log(k));
  return (args / Math.pow(k, i)).toPrecision(3) + ' ' + size[i]
});

///////////大屏设置
//状态
Vue.filter('sys', function (args) {
  let str = '';
  if (args == 'cpu') {
    str = 'CPU';
  } else if (args == 'disk') {
    str = '硬盘';
  } else if (args == 'mem') {
    str = '内存';
  }
  return str;
});
