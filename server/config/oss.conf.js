/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
const oss = {
  dev: {
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: ''
  },
  pro: {
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: ''
  }
}

module.exports = process.env.NODE_ENV === 'debug' ? oss.dev:oss.pro;

