/**
 * Created by qiucheng on 14/12/17.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length > 1;
            }, "password should be longer"
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: "provider is required"
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }


});

UserSchema.virtual("fullName").get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitNames = fullName.split(' ');
    this.firstName = splitNames[0] || '';
    this.lastName = splitNames[1] || '';
});


UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    //this指的是UserSchema
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({username: possibleUsername}, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            //不懂
            callback(null);
        }
    });
}

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);


