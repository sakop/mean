/**
 * Created by qiucheng on 14/12/16.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Post = new Schema({
    title: {
        type: String,
        required: true,
        validate: [function (title) {
            return title != null && title.length > 2;
        }, "The title is too short!!"
        ]
    },
    content: {
        type: String,
        required: true
    },
    author:{
        type:Schema.ObjectId,
        ref:'User'
    }
});