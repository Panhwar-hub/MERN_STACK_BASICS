const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const {db} = require('mongodb');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/ead')

const {render, compileFile} = require('pug');


const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const validateMiddlware = require('./middleware/middleware');

app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(fileupload())
//const product = require('./Product');
app.set('view engine','ejs')
app.use('/products/create',validateMiddlware)

app.use('/style',express.static('public/css'))
app.use('/images', express.static('public/img'))


app.all('/products/create',productController.createProduct);
app.all('/product/getProduct/:pid',productController.productDetail);
app.all('/products',productController.getProduct);
app.get('/create',productController.create);


// app.engine('html', require('pug').renderFile);
app.set('views', path.join(__dirname, 'views'));
//app.all('/blog', function(req,res){
    //res.render('Blog', {name:'parvez'})
    // using pug heading file here and passing input to it.
    // const func = compileFile('heading')
    // console.log(func({name:'Here Is it'}))
    // console.log(func({name: 'New one'}))
   // products = ['A','B','C','D','E','F','G','H']
  //  res.render('Blog', {name:'parvez', products})
//})

app.all('/', function(req, res) {
    // const homepage = path.resolve(__dirname, 'Home.html')
    // res.sendFile(homepage)
    // file renderning using ejs
    products = ['A','B','C','D','E','F','G','H']
    prices =[10,100,100,102,120,130,140,1509,1051,140,139]
    res.render('Home', {name:'Parvez', products, prices})    
})

app.get('/signup', userController.create);
app.post('/user/create', userController.signup);


app.all('/about', function(req,res) {
    // const aboutpage = path.resolve(__dirname, 'About.html')
    // res.sendFile(aboutpage)

    res.render('About')
})
app.use('*', function(req, res){
    res.status(400).send("Not Found")
})
// const server = http.createServer(function (req, res) {
//     if(req.url == '/') {
//     const home = fs.readFileSync('Home.html')
//     res.end(home) }
//     else if (req.url == '/about'){
//     const about = fs.readFileSync('About.html');
//     res.end(about); }
// })

// server.listen(3000, function () {
//     console.log("lisning at port 3000")
// })

app.listen(3000, function(){
    console.log("done")
})