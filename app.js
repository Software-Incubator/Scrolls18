const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const fileUpload = require('express-fileUpload');
const cors = require('cors');
const routes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const gapi = require('./googleapis');
const app = express();
const port = 3000 || process.env.PORT;
const fs = require('fs');

require('./passport');
require('./googleapis.js');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(fileUpload());
app.use(passport.initialize());
app.use('/api', routes);
app.use('/admin', adminRoutes);

//authorize google api
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    gapi.authorize(JSON.parse(content), function(auth) {
        console.log('authorized');
    });
});
//database connection
mongoose.connect(config.connection).then(function() {
    console.log('databse connection esatblished'); 
}).catch((err)=>{  console.log(err); });

app.listen(port, function(){
    console.log("Server running on 3000");
});
