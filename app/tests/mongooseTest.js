/**
 * Created by qiucheng on 14/12/16.
 */
process.env.NODE_ENV = "development";
var config = require("../../config/config");

mongoose = require('mongoose');
//不能漏！
mongoose.connect(config.url);
//test
require('../model/user.server.model.js');
require('../model/post.server.model');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

//var user = new User();
//user.username = "sakop0";
//user.save(function (err, saved) {
//    var post = new Post();
//    post.author = saved;
//    post.title = 'dmsd';
//    post.content = "adsdasdas";
//    post.save(function (err, savedPost) {
//        console.log("End");
//        mongoose.connection.close();
//    });
//});

Post.find().populate('author').exec(function(err,posts){
    for(var i in posts){
        console.log(posts[i].author.username);
    }
});