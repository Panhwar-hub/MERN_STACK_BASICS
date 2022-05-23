const Product = require('../models/Products')
const getProduct =async (req, res)=>{
    const products =await Product.find()
    res.render('products', {products})
}

const create = (req, res)=>{
    res.render('create')
}

const productDetail =  async (req,res) =>{
    const pid =req.params.pid;
    const prod =await Product.findById(pid)
    // console.log("PID:",pid);
    res.render('productDetails', {product:prod})
}

const createProduct = (req, res)=> {
    // Product.create({title:'Casio', price:200}, (err, product))
    // console.log(product);
    // res.redirect('/')
    console.log(req.body);
    const img =req.files.img
    img.mv(path.resolve(__dirname,"images/", img.name),(err)=>{
    Product.create({...req.body, image: img.name}, (err, product)=>{
        console.log(product)
        res.redirect("/")
    })})}


    module.exports = {getProduct, create, productDetail, createProduct};