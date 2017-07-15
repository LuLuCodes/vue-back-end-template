/**
 * Created by qianqing on 2017/3/13.
 */
import axios from 'axios';
// import store from '../../store';
// import router from '../../router';

// 将token直接放在前端还是有风险，目前采取在server端统一存储token
// axios 配置
// axios.defaults.timeout = 25000;
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     if (store.state.token) {
//       config.headers.Authorization = `token ${store.state.token}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 401 清除token信息并跳转到登录页面
//           router.replace({
//             path: 'login',
//             query: {redirect: router.currentRoute.fullPath}
//           });
//       }
//     }
//     // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
//     return Promise.reject(error.response.data);
//   });

/***
 * ajax请求函数
 * @param url
 * @param json
 * @param method
 * @param timeout
 * @returns {*}
 */
export default function (url, json, method = 'post', timeout = 25000) {
  return new Promise((resolve, reject) => {
    if (!url || !json) {
      reject(`url or josn is null`);
    }

    let req = {
      url: url,
      method: method,
      data: json,
      timeout: timeout,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    };

    axios(req)
      .then((response) => {
        let res = response.data;
        if (res.IsSuccess === 1) {
          resolve(res.Data);
        } else {
          if (res.ErrorMessage === 'Request failed with status code 401') { // 如需对token过期做特殊处理，请修改
            reject(`${url} ${res.ErrorMessage}`);
          } else {
            reject(`${url} ${res.ErrorMessage}`);
          }
        }
      })
      .catch((error) => {
        console.error(`ajax error: ${url} ### ${error}`);
        if (error.message) {
          reject(`${url} ${error.message}`);
        } else {
          reject(`ajax 异常: ${url}`);
        }
      });
  });
};