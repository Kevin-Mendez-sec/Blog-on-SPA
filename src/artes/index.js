var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var template2 = require('./template2');
var template3 = require('./template3')


page('/artes', function(ctx,netx){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
    var about = document.getElementById('about');
    var plantas = document.getElementById('plantas');
empty(arriba);
empty(main).appendChild(template);
empty(about).appendChild(template2);
empty(plantas).appendChild(template3);
})