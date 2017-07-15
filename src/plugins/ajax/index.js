/**
 * Created by qianqing on 2017/3/13.
 */
import http from './http';

export default {
  install (Vue) {
    Vue.prototype.$http = http;
    Vue.http = http;
  },
  $http: http
};

export const $http = http;