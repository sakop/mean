var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var config = require('./config/env/development');
mongoose.connect(config.url);

var TestSchema = new Schema({
    test: {
        type: String,
        set: function (test) {
            return test + 'haha';
        }, get: function (test) {
            var length = test.length;
            return test.substring(0, length - 4);
        }

    }

});

TestSchema.virtual('random').get(function(){
   return 1;
});

TestSchema.set('toJSON',{getters:true,virtuals:true});

mongoose.model('Test', TestSchema);
var Test = mongoose.model('Test');

var test = new Test();
test.test = "bb";
console.log(test.test);
console.log(test.random);

Test.findById('5491925f51153ff2036a7554', function (err, user) {
    console.log(user);
    //get操作在这里被调用
    console.log(user.toJSON().random);
    mongoose.disconnect();
});


/*
 var salt = crypto.randomBytes(2).toString('base64');
 var password = "aaaewqe";
 console.log(crypto.pbkdf2Sync(password,salt,10000,3).toString('base64'));

 function aa(a,b,c){
 if(a)
 console.log('a is ' + a);
 if(b)
 console.log('b is ' + b);
 if(c)
 console.log('c is ' + c);
 }

 aa(1);
 aa(1,2);
 aa(1,2,3);
 aa(1,null,3);
 */