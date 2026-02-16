const mongoose = require('mongoose');
const express = require('express');

const Article = require('../models/article');
const router = express.Router();

//Creation article

router.post('/ajout', (req, res)=>{
    //1 : get data from request body
    let data = req.body;
    //2 : create article object
    let article = new Article(data);
    console.log(article);
    //3 : save article to database
    article.save()
    .then(
        (result) => {
        res.send(result);
    })
    .catch(
        (err) => {
        res.send(err);
    }   )
});

//List article
router.get('/list', (req, res)=>{
    Article.find()
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

//aritcle by id
router.get('/article/:id', (req, res)=>{
    let id = req.params.id;
    Article.findById(id)
    .then(
        (article) => {
        res.send(article);
        }    )
    .catch(
        (err) => {
        res.send(err);
        }
    );

    console.log('Article by id');
});
//Update article
router.put('/update/:id', (req, res)=>{
    let id = req.params.id;
    let data = req.body;
    Article.findByIdAndUpdate({ _id: id },data)
    .then(
        (articleUpdated) => {
                res.send(articleUpdated);
        }    )
    .catch(
        (err) => {
             res.send(err);
        }    );
    console.log('Article updated');
});

//Delete article
router.delete('/delete/:id', (req, res)=>{
    let id = req.params.id;
    Article.findByIdAndDelete(id)
    .then(
        (article) => {
        res.send(article);
        }
    )
    .catch(
        (err) => {
        res.send(err);
        }
    );
});



module.exports = router;