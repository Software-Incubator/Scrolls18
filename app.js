const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileUpload');

require('./googleapis');

const routes = require('./routes/api');
const app = express();
const port = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/api', routes);

//database connection
mongoose.connect('mongodb://scrolls-admin:5ky2n11@ds133762.mlab.com:33762/scrolls18').then(function() {
    console.log('databse connection esatblished'); 
}).catch((err)=>{  console.log(err); });

app.listen(port, function(){
    console.log("Server running on 3000");
});
