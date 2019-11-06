var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var template2 = require('./template2');

page('/Cultura', function(ctx,netx){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
empty(arriba);
empty(main).appendChild(template);
})

page('/Cultura2', function(ctx,next){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
empty(arriba);
empty(main).appendChild(template2);
})
