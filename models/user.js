const mongoose = require('mongoose');

//2: create model
const User = mongoose.model ('User',{
    fullname : {
        type : String,
        default : 'Yolio User'
        
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
     adresse : {
        type : String,

    },
    motdepasse : {
        type : String,
        required : true,
    }
});

module.exports = User;