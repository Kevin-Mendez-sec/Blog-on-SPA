var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var template2 = require('./template2');
var template3 = require('./template3');


page('/', function(ctx,netx){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
    var about = document.getElementById('about')
    var plantas = document.getElementById('plantas')
empty(arriba).appendChild(template);
empty(main).appendChild(template2);
empty(about).appendChild(template3);
empty(plantas)
})