var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var template2 = require('./template2');



page('/Home', function(ctx,netx){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
empty(arriba).appendChild(template);
empty(main).appendChild(template2);
})