var page = require('page');
require('./homepage');
require('./cultura');
require('./calculo');
require('./derecho');
require('./fisica');
require('./optativas');
require('./optativas/estrategias');

page();

const  sr = require('scrollreveal');
window.sr = ScrollReveal();

sr.reveal('.blog-header-logo' , {
    origin: 'top',
     duration: 2000
});
   
sr.reveal('.subtitulo', {
    origin: 'buttom'
});