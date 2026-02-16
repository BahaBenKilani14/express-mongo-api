const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const multer = require('multer');
let fileName = '';

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect ) => {
        fileName = Date.now() + '.' + file.mimetype.split('/')[1];
        redirect(null, fileName);


    }
})

const upload = multer({ storage: storage });
//crud of Product
//creation product
router.post('/add', upload.single('image'), (req, res)=>{
    let data = req.body;
    let product = new Product(data);
    product.image = fileName;
    product.save()
    .then(
        (result) => {
            fileName = '';
            res.send(result);
    })
    .catch(
        (err) => {
        res.send(err);
    }   )
});

//list product
router.get('/all', (req, res) =>{
    Product.find()
    .then(
        (list) => {
        res.send(list);
        }
    )
    .catch(
        (err) => {
        res.send(err);
        }
    )
});

//product by id
router.get('/product/:id', (req, res) =>{
    let id = req.params.id;
    Product.findById({ _id: id })
    .then(
        (product) => {  
           res.send(product);
        }
    )
    .catch( 
        (err) => {
           res.send(err);
        }   
    )
});

//delete product
router.delete('/delete-product/:id', (req, res) =>{
    let id = req.params.id;
    Product.findByIdAndDelete({ _id: id })
    .then(
        (product) => {  
        res.send(product);
        }
    )
    .catch(
        (err) => {
        res.send(err);
        }   
    )
});

module.exports = router;