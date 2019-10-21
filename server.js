var express =require('express');
var app = express();

app.set('view engine' , 'pug');
app.use(express.static('public'));

app.get('/Home',function (req, res){
    res.render('index');
    })
app.get('/Cultura',function (req, res){
res.render('index');
})

app.get('/fisica',function (req, res){
res.render('index');
})

app.get('/calculo',function (req, res){
res.render('index');
})

app.get('/derecho',function (req, res){
res.render('index');
})
app.get('/ingles',function (req, res){
res.render('index');
})
app.get('/artes',function (req, res){
res.render('index');
})
app.get('/optativas',function (req, res){
res.render('index');
})
app.get('/estrategias',function (req, res){
res.render('index');
})

    
app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
console.log( 'Node server is running on port ' + app.get( 'port' ));
});
