/*
 * File Created: Wednesday, 2nd May 2018 11:34:06 am
 * Author: chenzway
 * -----
 * Last Modified: 2019-04-08 15:41:24, Monday
 * Modified By: chenzway
 * -----
 */

import router from './router';
import store from './store/store';
import { cookie, local } from '@/utils/token';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (cookie.get('token') !== undefined && cookie.get('name') !== undefined) { //如果已经登陆
    if (to.path === '/login') { //登陆后访问login自动跳到/默认页
      next({ path: '/' });
    }
  } else { //未登陆状态
    if (to.path === '/login') {
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
  NProgress.done(); //关闭进度条动画
});

router.afterEach(() => {
  NProgress.done();
});
