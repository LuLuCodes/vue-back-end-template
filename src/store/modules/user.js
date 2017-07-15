import Cookies from 'js-cookie';

const user = {
  state: {
    token: Cookies.get('Admin-Token'),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 邮箱登录
    LoginByAccount({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        Cookies.set('Admin-Token', '1234567890');
        commit('SET_TOKEN', '1234567890');
        resolve();
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', ['admin']);
        commit('SET_NAME', 'leyi');
        commit('SET_AVATAR', 'http://img.qqbody.com/uploads/allimg/201307/30-193640_240.jpg');
        resolve(['admin']);
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        Cookies.remove('Admin-Token');
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      });
    }
  }
};

export default user;
