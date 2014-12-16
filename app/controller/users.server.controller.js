/**
 * Created by qiucheng on 14/12/15.
 */
var User = require('mongoose').model('User');

exports.create = function (req, res, next) {
    //trim is executed here
    var user = new User(req.body);
    console.log("!!!" + user.username);
    if(!user.authenticate()){
        res.json({answer:"The password is too short"});
        return;
    }
    user.save(function (err) {
        if (err)
            return next(err);
        else
            res.json(user);
    });
}

exports.list = function (req, res, next) {
    User.find({}, '', {skip:0, limit: 5}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
}

exports.passId = function (req, resp, next, id) {
    req.id = id;
    next();
}


exports.getUserById = function (req, res,next) {
    User.findOne({_id: req.id}, '', function (err, user) {
        if (err)
            return next(err);
        else {
            res.json(user);
        }
    });


}


exports.updateUserById = function (req, res, next) {
    User.findByIdAndUpdate(req.id, req.body, function (err, user) {
        if (err)
            return next(err);
        else
            res.json(user);
    });
}

exports.deleteUserById = function (req, res, next) {
    User.findByIdAndRemove(req.id, function (err, user) {
        if (err)
            return next(err);
        else {
            var retObj = {};
            retObj.toJSON = function () {
                if(user == null)
                    return {answer:"This user is already deleted"};
                var userObj = user.toJSON();
                return {answer:" The user " + userObj.lastName + " " + userObj.firstName + " is deleted"};
            }
            res.json(retObj);
        }
    });
}