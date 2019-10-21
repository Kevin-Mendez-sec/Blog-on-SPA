var express = require('express');
var app = express();

app.set('view engine' , 'pug');

app.use(express.static('public'));

app.get('/',function (req, res){
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

    
app.listen(process.env.PORT || 3000, function (err){
     if (err) return console.log('hubo un error'), process.exit(1);
   console.log('corriendo en el 3000');
  })