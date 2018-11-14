let format = require("../utils/tool").format,
    formidable = require('formidable'),
    fs = require("fs"),
    sd = require("silly-datetime"),
    path = require("path"),
    config = require("../config")

//上传文件
const uploadFile = (req, res, next) => {
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
}

const downFile = (req, res, next) => {

    let {
        fileName
    } = req.query,
        filePath = config.downPath + fileName,
        fsStream = fs.createReadStream(filePath);

    fs.exists(filePath, function (exist) {
        if (exist) {
            res.set({
                "Content-type": "application/octet-stream",
                "Content-Disposition": "attachment;filename=" + encodeURI(fileName)
            });
            fsStream.on("data", function (chunk) {
                res.write(chunk, "binary")
            });
            fsStream.on("end", function () {
                res.end();
            });
        } else {
            res.set("Content-type", "text/html");
            res.send("file not exist!");
            res.end();
        }

    })
}
const getFileList= (req, res, next) => {
    let fileObj=fs.readdirSync(config.downPath);
    let promiseList=[]
    fileObj.forEach((fileName,index) => {
        promiseList.push(fsStat({filename:fileName}));
    });
    Promise.all(promiseList).then(datas=>{
        console.log(JSON.stringify(datas));
        res.send(format({
            data:datas
        }))
    })
}

let fsStat =(itemObj) =>{
    return new Promise((resolve, reject) => {
        fs.stat(path.join(config.downPath,itemObj.filename),function(err, stats){
            var isFile = stats.isFile();
            var isDir = stats.isDirectory();
            resolve({isDir:isDir,filename:itemObj.filename});
        })
    })


}

module.exports = {
    uploadFile,
    downFile,
    getFileList
}