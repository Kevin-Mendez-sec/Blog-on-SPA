var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var template2 = require('./template2');


page('/fisica', function(ctx,netx){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
    var about = document.getElementById('about');
empty(arriba);
empty(main).appendChild(template);
empty(about).appendChild(template2);
})