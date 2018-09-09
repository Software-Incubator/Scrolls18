const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const fileUpload = require('express-fileUpload');
const cors = require('cors');
const routes = require('./routes/api');
const app = express();
const port = 3000 || process.env.PORT;

require('./passport');
require('./googleapis.js');

app.use(helmet());
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
