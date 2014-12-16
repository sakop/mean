/**
 * Created by qiucheng on 14/12/15.
 */

var users = require('../controller/users.server.controller.js');
module.exports = function(app){
    app.route('/users').get(users.list).post(users.create);
    app.route('/users/:userId').get(users.getUserById).put(users.updateUserById).delete(users.deleteUserById);
    app.param("userId",users.passId);
}