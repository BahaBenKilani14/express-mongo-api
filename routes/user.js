const mongoose = require('mongoose');
const express = require('express');
let bcrypt = require('bcrypt');


const router = express.Router();
const Article = require('../models/article');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

//add user
router.post('/signup', (req, res)=>{
    let data = req.body;
    cryptedPass = bcrypt.hashSync(data.motdepasse, 10);
    data.motdepasse = cryptedPass;
    let usr = new User(data);
    usr.save()
    .then(
        (result) => {
            result.motdepasse = '';
            res.send(result);
    })
    .catch(
        (err) => {
        res.send(err);
    }   )

});

router.post('/signin', (req, res)=>{
    let {email, motdepasse} = req.body;
    User.findOne({ email : email })
    .then(
        (user) => {
            if (!user) {
                res.send({message : "user not found"});
            } else {

                let test = bcrypt.compareSync(motdepasse, user.motdepasse); 
                if (test == false) {
                    res.send({message : "email or password invalid"});
                } else {


                    let payload = {
                        id : user._id,
                        fullname : user.fullname,
                        email : user.email,
                }
                let token = jwt.sign(payload, 'yolio');
                res.send(token);
                }
        }
    }) 
    
    .catch(
        (err) => {
            res.send(err);
        }
    )
});







//export router
module.exports = router;