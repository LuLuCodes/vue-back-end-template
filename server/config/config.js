/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
const oss = require('./oss.conf');
const wx = require('./wx.conf');
const api = require('./api.conf');
const config = {
  oss, wx, api
};

module.exports = config;
