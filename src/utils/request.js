/*
 *  File Created: 2018-05-21 08:59:29
 * Author: chenzway
 * Email:  chenzway@163.com
 * -----
 * Last Modified: 2019-07-05 17:03:54, Friday
 * Modified By: chenzway
 * ----
 */

import axios from 'axios';
import { stringify } from 'qs';
import { Message, Loading } from 'element-ui';
import store from '@/store/store';
import router from '@/router';
import { setToken, cookie } from '@/utils/token';

let baseURLStr = window.g.baseUrl;

var loadingArray = [];
let cancel;
let promiseArr = {};
const CancelToken = axios.CancelToken;

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '访问被禁止',
//   404: '404,请求地址不存在!',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时,请稍后再试！',
//   40004: '用户登录过期，请重新登录!',
//   90014: '读取超时!',
//   ECONNABORTED: '请求超时!'
// };

function closeLoading() {
  loadingArray.forEach(v => {
    v.close();
    loadingArray.shift();
  });
}

function showMsg(message) {
  if (message === 'Network Error' || !message || message === '') {
    message = i18n.t('errorCode.netError');
    // message = '网络异常, 请稍后再试！';
  }
  Message({
    message,
    type: 'error',
    duration: 5 * 1000
  });
}

const service = axios.create({
  baseURL: baseURLStr,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  transformRequest: [data => stringify(data)]
});

// 请求拦截
service.interceptors.request.use(
  config => {
    closeLoading();
    let dom = document.querySelector('.ajaxload');
    if (dom) {
      let loading = Loading.service({
        target: dom,
        text: '正在加载中...'
      });
      loadingArray.push(loading);
    }

    if (promiseArr[config.url]) {
      promiseArr[config.url]('cancel');
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }

    if (config.url !== 'user/login') {
      if (store.getters.token && store.getters.name) {
        config.data['token'] = store.getters.token;
        config.data['user_name'] = store.getters.name;
      }
    }

    return config;
  },
  error => {
    closeLoading();
    showMsg(codeMessage[error.response.status]);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data;
    setToken(store.getters.token);
    closeLoading();
    switch (res.status) {
      case 0:
        return res;
      case 20012:
        cookie.del('token');
        cookie.del('name');
        router.push('/login');
        showMsg(i18n.t(`errorCode.20012`));
      case 40004:
        cookie.del('token');
        cookie.del('name');
        router.push('/login');
        showMsg(i18n.t(`errorCode.40004`));
        // showMsg(codeMessage[40004]);
        return false;
      case 40002:
        showMsg(i18n.t(`errorCode.40002`));
        return false;
      case undefined:
        showMsg(i18n.t(`errorCode.emptyObject`));
        return false;
      default:
        showMsg(i18n.t(`errorCode.${res.status}`));
        // showMsg(res.info);
        return false;
    }
  },
  error => {
    /* console.log(error);
    console.log(error.response);
    console.log(error.code);
    console.log(error.message); */

    closeLoading();

    if (error.message && error.message === 'cancel') {
      return Promise.reject(error);
    }

    // timeout
    if (error.code === 'ECONNABORTED') {
      showMsg(i18n.t(`errorCode.ECONNABORTED`));
      // showMsg(codeMessage.ECONNABORTED);
      return Promise.reject(error);
    }

    // 返回体的错误信息
    if (error.response && error.response.status) {
      showMsg(i18n.t(`errorCode.${error.response.status}`));
      // showMsg(codeMessage[error.response.status]);
      return Promise.reject(error);
    }
    // 其它
    showMsg(error.message);
    return Promise.reject(error);
  }
);

// 直接使用 axios, axios.post 可做请求
// export default service;

const $post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data,
      cancelToken: new CancelToken(c => {
        cancel = c;
      })
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const $get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url,
      params,
      cancelToken: new CancelToken(c => {
        cancel = c;
      })
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { $post, $get };
