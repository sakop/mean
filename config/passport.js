/**
 * Created by qiucheng on 14/12/16.
 */
var passport = require('passport'),
    mongoose = require('mongoose');

//使用隐射，而不是数据库
var mapping = {};

module.exports = function () {
    var User = mongoose.model('User');
    passport.serializeUser(function (user, done) {
        mapping[user.id] = user;
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        //User.findOne({
        //    _id: id
        //}, '-password -salt', function (err, user) {
        //    done(err, user);
        //});
        user = mapping[id]
        done(null,user);
    });
    require('./strategies/local.js')();
};