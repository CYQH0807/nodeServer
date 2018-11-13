"use strict"

var express = require("express");
var router = express.Router();
var Controllers = require('./controllers');
let format = require("./utils/tool").format;
var http = require("http");
var formidable = require('formidable');
var fs = require("fs");
var sd = require("silly-datetime");
var path = require("path");

router.post("/app/add", Controllers.app.add);
router.get("/app/list", Controllers.app.list);
router.get("/app/check", Controllers.app.check);
router.get("/app/addShipCar", Controllers.app.addShipCar);
router.get("/app/shipCarList", Controllers.app.shipCarList);
router.get("/app/deleteShipCar", Controllers.app.deleteShipCar);



//文件上传服务
router.post('/app/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function (err, fields, files) {
        //使用第三方模块silly-datetime
        var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
        //生成随机数
        var ran = parseInt(Math.random() * 8999 + 10000);
        //拿到扩展名
        var extname = path.extname(files.file.name);
        //旧的路径
        var oldpath = __dirname + "/" + files.file.path;
        //新的路径
        let pathName = t + ran + extname;
        var newpath = __dirname + '/uploads/' + pathName;

        //改名
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw Error("改名失败");
            }
            res.send(format({
                data: {
                    path: newpath,
                    pathName: pathName
                }
            }))
        });
    });

});
//文件上传服务
router.get('/app/test', function (req, res, next) {
    console.log("啊??")
});

module.exports = router;