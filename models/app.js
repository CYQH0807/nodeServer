var mongoose = require("mongoose"),
    moment = require("moment")
var modelSchema = new mongoose.Schema({
    appName: { type: String, require: true },
    jsPath: { type: String, require: true },
    iOS: { type: String, require: true },
    android: { type: String, require: true },
    jsVersion: { type: String, require: true },
    timestamp: {type: Number, require: true },
    createTime: {type: String, default: moment().format('YYYY-MM-DD h:m:s')}
})

var shipCarSchema = new mongoose.Schema({
    id: { type: String, require: true },
    userId:{type: String, require: true},
    name: { type: String, require: true },
    price: { type: String, require: true },
    Number: { type: String, require: true },
})




modelSchema.methods.findbyAppName = (appName, callback) => {
    this.model('app').find({ appName }, callback)
}
shipCarSchema.methods.findbyid = (id, callback) => {
    this.model('shipCar').find({ id }, callback)
}

var AppModel = mongoose.model("app", modelSchema);
var shipCarModel=mongoose.model("shipCar", shipCarSchema);
module.exports = {AppModel,shipCarModel}