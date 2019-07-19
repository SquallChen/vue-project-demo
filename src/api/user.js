/*
 * File Created: Monday, 21st May 2018 8:59:29 am
 * Author: chenzway
 * -----
 * Last Modified: 2019-05-08 16:03:55, Wednesday
 * Modified By: chenzway
 * -----
 */

import { $post } from '@/utils/request';
import sha1 from 'sha1';

function login(user_name, pw) {
  return $post('user/login', {
    user_name,
    signature: sha1(pw),
    domain: 'Cors' + new Date().valueOf()
  });
}

function logout() {
  return $post('user/logout');
}
function auth_rules_page(num_per_page = 1000) {
  return $post('user/auth_rules_page', { num_per_page });
}

export { login, logout, auth_rules_page };
