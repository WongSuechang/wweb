var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var UUID = require('uuid');


var config = require('../conf/mysql');
var $sql = require('./userSQL');

var pool = mysql.createPool(config.mysql);

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var userUUID = UUID.v1();
            connection.query($sql.insert, [userUUID, req.body.name, req.body.pwd, req.body.phone], function (err, result) {
                if (err) {
                    res.json({
                        success: 0,
                        msg: err
                    });
                } else {
                    res.json({
                        success: 1,
                        msg: '注册成功'
                    });
                }
                // 释放连接 
                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
                connection.release();
            });
        });
    },
    login: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.login, [req.body.name, req.body.name, req.body.pwd], function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({
                        success: 0,
                        msg: '登录失败,用户名或密码错误'
                    });
                } else {
                    if (result.length > 0) {
                        var user = result[0];
                        res.json({
                            success: 1,
                            msg: '登录成功',
                            data: user
                        });
                    } else {
                        res.json({
                            success: -1,
                            msg: '登录失败,用户名或密码错误'
                        });
                    }
                }
                connection.release();
            })
        })
    },
    check: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.check, [req.body.name, req.body.phone], function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({
                        success: 0,
                        msg: '网络异常'
                    });
                    connection.release();
                } else {
                    if (result.length > 0) {
                        res.json({
                            success: -1,
                            msg: '该用户名已注册,或手机号码已被占用'
                        });
                        connection.release();
                    } else {
                        connection.release();
                        next();
                    }
                }
            })
        })
    }
};