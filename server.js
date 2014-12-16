/**
 * Created by qiucheng on 14/12/11.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./config/mongoose.js')();
var express = require('./config/express');
var app = express();
app.set('json spaces',"\t");
app.listen(3000);



module.exports = app;
console.log('Server is running');