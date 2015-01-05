/**
 * Created by qiucheng on 14/12/15.
 */
var User = require('mongoose').model('User');
var passport = require('passport');

var getErrorMessage = function (err) {
    var messages = [];

    if (err.code) {
        //MongoDB error
        switch (err.code) {
            case 11000:
            case 11001:
                messages.push('UserName already exits');
                break;
            default:
                messages.push('something went wrong');
        }
    } else {
        //Mongoose validation error
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                messages.push(errName + ":" +err.errors[errName].message);
        }
    }

    return messages;
}

exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        console.log(req.flash('info'));
        console.log(req.flash('error'));
        res.render('signin', {
                title: 'Sign-in Form',
                messages: req.flash('error') || req.flash('info')
            }
        )
    }else{
        res.redirect('/');
    }


}

exports.renderSignup = function (req, res, next) {
    //如果未登录（passport模块提供req.user)不存在的话跳往注册界面
    if (!req.user) {
        res.render('signup', {title: 'Sign-up form', messages: req.flash('error')});
    } else {
        //不然跳往主页
        return res.redirect('/');
    }
}

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        console.log(user.password);
        user.provider = 'local';

        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                if (err)
                    return next(err);
                return res.redirect('/');
            });
        })
    }
}

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
}


exports.create = function (req, res, next) {
    //trim is executed here
    var user = new User(req.body);
    console.log("!!!" + user.username);
    if (!user.authenticate()) {
        res.json({answer: "The password is too short"});
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
    User.find({}, '', {skip: 0, limit: 5}, function (err, users) {
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


exports.getUserById = function (req, res, next) {
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
                if (user == null)
                    return {answer: "This user is already deleted"};
                var userObj = user.toJSON();
                return {answer: " The user " + userObj.lastName + " " + userObj.firstName + " is deleted"};
            }
            res.json(retObj);
        }
    });
}