import { login } from '@/api/user';
import { setToken, cookie } from '@/utils/token';

const user = {
  state: {
    token: cookie.get('token'),
    name: cookie.get('name'),
    sidebar: {
      opened: !+cookie.get('sidebarStatus')
    },
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        cookie.set('sidebarStatus', 1);
      } else {
        cookie.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    actionLogin({ commit }, userInfo) {
      const userName = userInfo.userName.trim();
      return new Promise((resolve, reject) => {
        login(userName, userInfo.pw)
          .then(r => {
            commit('SET_TOKEN', r.token);
            commit('SET_NAME', userName);
            setToken(r.token);
            cookie.set('name', userName);
            resolve(r);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },

    setRoles({ commit, state }, roles) {
      commit('SET_ROLES', roles);
    },
  }
};

export default user;
