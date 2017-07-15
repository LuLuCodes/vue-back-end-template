/**
 * Created by qianqing on 2017/2/13.
 */
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', function (req, res, next) {
  res.redirect('index');
});

router.get('/index', function (req, res, next) {
  res.render('index', {title: 'Vue'});
});
