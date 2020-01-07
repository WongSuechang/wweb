var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDAO');

/* GET users listing. */
router.get('/', function (req, res, next) {
  userDao.queryAll(req, res, next);
});

// post 登录
router.post('/login', function (req, res, next) {
  userDao.login(req, res, next);
});

// post 注册用户
router.post('/add', function (req, res, next) {
  var name = req.body.name;
  var phone = req.body.phone;
  var pwd = req.body.pwd;
  if (typeof (name) == 'undefined' || typeof (phone) == 'undefined' || typeof (pwd) == 'undefined') {
    res.json({
      success: -2,
      msg: '参数异常'
    });
  } else {
    if (name.toString().length > 0 && phone.toString().length == 11 && phone.toString().indexOf('1') == 0) {
      //首先检查用户名和手机号码是否已存在
      userDao.check(req, res, next);
    } else {
      res.json({
        success: -2,
        msg: '参数异常'
      });
    }
  }
})

router.post('/add', function (req, res, next) {
  userDao.add(req, res, next);
});

router.post('/update', function (req, res, next) {
  userDao.update(req, res, next);
})

module.exports = router;