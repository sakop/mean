/**
 * Created by qiucheng on 14/12/15.
 */

var users = require('../controller/users.server.controller.js');
var passport = require('passport');

/*
 module.exports = function(app){
 app.route('/users').get(users.list).post(users.create);
 app.route('/users/:userId').get(users.getUserById).put(users.updateUserById).delete(users.deleteUserById);
 app.param("userId",users.passId);
 }
 */


module.exports = function (app) {
    app.route('/signup').get(users.renderSignup).post(users.signup);
    app.route('/signin').get(users.renderSignin).post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'signin',
        failureFlash: true
    }));

    app.get('/signout', users.signout);
};