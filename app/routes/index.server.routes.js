/**
 * Created by qiucheng on 14/12/11.
 */

module.exports = function (app) {
    var index = require('../controller/index.server.controller');
    app.get('/', index.render);
};