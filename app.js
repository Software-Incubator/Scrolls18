const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileUpload = require('express-fileUpload');
const cors = require('cors');
require('./passport');
const routes = require('./routes/api');
const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(passport.initialize());
app.use('/api', routes);

//database connection
mongoose.connect(config.connection).then(function() {
    console.log('databse connection esatblished'); 
}).catch((err)=>{  console.log(err); });

app.listen(port, function(){
    console.log("Server running on 3000");
});
