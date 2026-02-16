const express = require('express');
const app = express();

app.use(express.json());
require('./config/connect');
//http://127.0.0.1:3002

//routes
//article route
const articleRoute = require ('./routes/article')
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');



app.use('/article', articleRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);



app.use('/uploads', express.static('./uploads'));
//test endpoint
app.get('/', (req, res) => {
    res.send('Hello world from node js');
});

app.listen(
    3002,
     ( ) => {
    console.log('Server is running on port 3002');
});


