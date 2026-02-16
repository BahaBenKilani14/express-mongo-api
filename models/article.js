//1: import mongoose
const mongoose = require('mongoose');

//2: create model
const Article = mongoose.model ('Artcle',{
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    categorie: {
        type: String,
    }
});

//3: export model
module.exports = Article;