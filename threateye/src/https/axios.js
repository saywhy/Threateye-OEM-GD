/**
 * 封装 axios
 * created by yuechanglin 20200225
 * */
/*import axios from 'axios';
import qs from 'qs';
import {Message} from 'element-ui';

import {getToken} from '@/store/layout/cookie';

/!*环境切换*!/
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://www.production.com';
}

//超时设置10s
axios.defaults.timeout = 10000;

//post请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = getToken();
    if(token) {
      config.headers['Authorization'] = token;
    }
    if(config.method === 'post'){
      config.data = qs.stringify(config.data);
      config.headers['ContentType'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  error => {
    Message.error({message: '请求超时!'});
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {

  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 401:
        console.log('未授权，请重新登录')
        break;
      case 403:
        console.log('拒绝访问')
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        break;
      case 405:
        console.log('请求方法未允许')
        break;
      case 408:
        console.log('请求超时')
        break;
      case 500:
        console.log('服务器端出错')
        break;
      case 501:
        console.log('网络未实现')
        break;
      case 502:
        console.log('网络错误')
        break;
      case 503:
        console.log('服务不可用')
        break;
      case 504:
        console.log('网络超时')
        break;
      case 505:
        console.log('http版本不支持该请求')
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
  }
  return Promise.resolve(err.response)
})

export default axios;*/


import axios from 'axios';
import Vue from 'vue'

axios.defaults.baseURL = '';
import Router from '@/router/index'

import {Message} from 'element-ui';

import {removeToken} from '@/store/layout/cookie';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  //console.log(response)
  //status内层
  switch (response.data.status) {
    case 602:
      console.log(response.data.msg)
      Message.warning(response.data.msg+',请修改个人信息');
      //Message.warning('请修改个人信息');
      //删除token
      //removeToken();
      //location.reload();
      //Vue.$router.push({path:'/login'});
      //return false;
      break;
    case 600:
      Router.push({path:'/600'});
      break;
    case 404:
      Router.push({path:'/404'});
      break;
    case 401:
      Router.push({path:'/404'});
      break;
    default:
      Router.push({path:'/emerge/network'})
      //console.log(`请求状态${response.status}`)
  }
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 401:
        console.log('未授权，请重新登录')
        break;
      case 403:
        console.log('拒绝访问')
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
  }
  return Promise.resolve(err.response)
})

export default axios;
