/**
 * Created by qiucheng on 14/12/26.
 */
var o = {};
Object.defineProperty(o, "des", {
    enumerable: true,
    configurable: false,
    writable: true
});

function iterate(o) {
    for (var i in o) {
        console.log(i + ":" + o[i]);
    }
}

console.log(o.des);
iterate(o);
o.des = 1;
delete o.des;
console.log(o.des);

o._in_ = {};
Object.defineProperty(o, 'in', {
    get: function () {
        return o._in_.in * 10;
    },
    set: function (v) {
        o._in_.in = v
    }
});

o.in = 5;
console.log(o.in);



var o = {}; // Creates a new object

Object.defineProperty(o, 'a', {
    value: 37,
    writable: true
});

o.a = 25;
console.log(o.a);