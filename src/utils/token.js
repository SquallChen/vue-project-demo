import Cookies from 'js-cookie';

function getToken() {
  return Cookies.get('token');
}

// const expires = 1/2520
const expires = 1 / 12;
function setToken(token) {
  return Cookies.set('token', token, { expires });
}

function removeToken() {
  return Cookies.remove('token');
}

let cookie = {
  get(k) {
    return Cookies.get(k);
  },
  set(k, v, expires = 365) {
    return Cookies.set(k, v, {expires});
  },
  del(k) {
    return Cookies.remove(k);
  }
};

let session = {
  get(k) {
    return JSON.parse(window.sessionStorage.getItem(k)) || null;
  },
  set(k, v) {
    window.sessionStorage.setItem(k, JSON.stringify(v));
  },
  del(k) {
    window.sessionStorage.removeItem(k);
  }
};

let local = {
  get(k) {
    return JSON.parse(window.localStorage.getItem(k)) || null;
  },
  set(k, v) {
    window.localStorage.setItem(k, JSON.stringify(v));
  },
  del(k) {
    window.localStorage.removeItem(k);
  }
};
export { getToken, setToken, removeToken, cookie, session, local };
