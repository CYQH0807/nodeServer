"use strict"

var express = require("express");
var router = express.Router();
var Controllers = require('./controllers');


router.post("/app/add", Controllers.app.add);
router.get("/app/list", Controllers.app.list);
router.get("/app/check", Controllers.app.check);
router.get("/app/addShipCar", Controllers.app.addShipCar);
router.get("/app/shipCarList", Controllers.app.shipCarList);
router.get("/app/deleteShipCar", Controllers.app.deleteShipCar);

//文件服务
router.post('/file/upload', Controllers.file.uploadFile);
router.get("/file/downFile", Controllers.file.downFile);
router.get("/file/getFileList", Controllers.file.getFileList);

module.exports = router;