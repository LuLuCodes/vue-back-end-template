/**
 * Created by qianqing on 2017/4/17.
 */
const axios = require('axios');
const logger = require('../../logger').api;
// axios 配置
// axios.defaults.timeout = 25000;
// axios.defaults.baseURL = 'https://api.github.com';

/***
 * ajax请求函数
 * @param url
 * @param json
 * @param method
 * @param timeout
 * @returns {*}
 */
exports = module.exports = function (cloud, url, json, method = 'post', timeout = 25000) {
  var promise = new Promise((resolve, reject) => {
    if (!cloud || !url || !json) {
      reject('cloud, url, data参数错误');
    }

    let req = {
      url: `http://${cloud.ip}:${cloud.port}${cloud.basePath}${url}`,
      method: method,
      data: json,
      timeout: timeout,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    };
    logger.debug(`${req.url} ###: ${JSON.stringify(json)}`);
    axios(req)
      .then((response) => {
        let res = response.data;
        if (res.HasError) {
          logger.error(`${req.url} request error: ${res.Fault.ErrorDescription}`);
          reject({IsSuccess: 0, Data: res.Body, ErrorMessage: res.Fault.ErrorDescription});
        } else {
          if (Array.isArray(res.Body)) {
            resolve({IsSuccess: 1, Data: {List: res.Body, Count: res.Paging.TotalCount}, ErrorMessage: ''});
          } else {
            resolve({IsSuccess: 1, Data: res.Body, ErrorMessage: ''});
          }
        }
      })
      .catch((error) => {
        logger.error(`${req.url} request error: ${error.message}`);
        reject({IsSuccess: 0, Data: {}, ErrorMessage: error.message});
      });
  });

  return promise;
};