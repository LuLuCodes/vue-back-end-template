/**
 * Created by qianqing on 2017/2/4.
 */
'use strict';
const wx = {
  dev: {
    appId: '',
    secret: '',
    redirect_outh: '',
    url: '',
    merchantId: '',
    merchantKey: '',
    key: '',
    notifyUrl: ''
  },
  pro: {
    appId: '',
    secret: '',
    redirect_outh: '',
    url: '',
    merchantId: '',
    merchantKey: '',
    key: '',
    notifyUrl: ''
  }
}

module.exports = process.env.NODE_ENV === 'debug' ? wx.dev : wx.pro;
