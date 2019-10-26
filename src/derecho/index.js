var page = require('page');
var empty = require('empty-element');
var template = require('./template');


page('/derecho', function(ctx,netx){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
empty(arriba);
empty(main).appendChild(template);
})