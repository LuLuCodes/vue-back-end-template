// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化

import AjaxPlugin from './plugins/ajax';
import VueLazyload from 'vue-lazyload'; // 引入图片懒加载模块
import inputPrice from './directive/input-price';
import inputQuantity from './directive/input-quantity';
import vueWaves from './directive/waves';// 水波纹指令
import errLog from './store/errLog';// error log组件
import mixins from './mixins';
import './assets/css/index.scss'; // 全局自定义的css样式

Vue.use(AjaxPlugin);
Vue.use(inputPrice);
Vue.use(inputQuantity);
Vue.use(ElementUI);
Vue.use(vueWaves);
Vue.mixin(mixins);

// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
  preLoad: 1.3,
  lazyComponent: true,
  error: require('./assets/images/404.jpg'),
  loading: require('./assets/images/loading-spin.svg'),
  listenEvents: ['scroll'],
  attempt: 1
});

Vue.config.productionTip = false;

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          const roles = res;
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to }); // hack方法 确保addRoutes已完成
          });
        });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next();//
        } else {
          next({ path: '/401', query: { noGoBack: true } });
        }
        // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});


router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

// 生产环境错误日志
if (process.env === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    });
  };
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
});