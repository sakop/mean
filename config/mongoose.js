/**
 * Created by qiucheng on 14/12/15.
 */
var config = require("./config");

mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect(config.url);
    require('../app/model/user.server.model');
    require('../app/model/post.server.model');
    return db;
}


