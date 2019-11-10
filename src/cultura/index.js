var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var template2 = require('./template2');
var template3 = require('./template3')
var template4 = require('./template4')
var template5 = require('./template5')

page('/Cultura', function(ctx,netx){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
    var about = document.getElementById('about');
    
empty(arriba);
empty(main).appendChild(template);
empty(about).appendChild(template3)
empty(plantas).appendChild(template4)
})

page('/Cultura2', function(ctx,next){
    var main = document.getElementById('main-container');
    var arriba = document.getElementById('arriba');
    var about = document.getElementById('about');
    var plantas = document.getElementById('plantas')
empty(arriba);
empty(main).appendChild(template2);
empty(about).appendChild(template3)
empty(plantas).appendChild(template5)
})
