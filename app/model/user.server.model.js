/**
 * Created by qiucheng on 14/12/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
        firstName: String,
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            match: /.+\@.+\..+/
        },
        username: {
            type: String,
            trim: true,
            required: true,
            validate: [
                function (username) {
                    return username.length >= 6;
                }, "The name is too short"
            ]
        },
        password: {
            type: String,
            trim: true
        }
        ,
        created: {
            type: Date,
            default: Date.now
        }
        ,
        age: {
            type: Number,
            default: 15,
            get: function (age) {
                return "I am " + age;
            }
        }

    })
    ;

UserSchema.set('toJSON', {getters: true});
//inferred attribute
UserSchema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (fullName) {
    var names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
});

//static用来声明新的数据库操作
UserSchema.static.findOneByName = function (username, callback) {
    this.findOne({username: username}, callback);
}

//methods用来为每一个model对象增加操作（如验证）
UserSchema.methods.authenticate = function () {
    if (this.password == null)
        return false;
    return this.password.length > 6;
};

UserSchema.pre("save", function (next) {
    console.log(this);
    next();
});

UserSchema.post('save', function (next) {
    if (this.isNew)
        console.log("A new element is inserted")
    else {
        console.log("A new element is updated")
    }
});

mongoose.model('User', UserSchema);