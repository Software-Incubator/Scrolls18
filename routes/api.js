const express = require('express');
const authController = require('../controllers/auth');
const dashboardController = require('../controllers/dashboard');
let config = require('../config');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const verifyToken = require('../controllers/auth').verifyTokenUtil; 

//auth routes
router.post('/signUp', authController.signUp);
router.get('/sendEmail', function(req, res){
  const templatePath = path.join(__dirname, '../mail-templates/html.ejs');
  const subject = "Team Registered";
  const templates = {
      teamname: '23teamName',
      teamid: '2teamId'
  }
  config.sendYourMail(
      templatePath, 
      'akgecscrolls18@gmail.com', 
      'suyashsrv7@gmail.com',
      subject,
      templates,
      function(err, info) {
          if (err)
              res.status(500).json({error: {status: true, errorInfo: "Could not send mail"},msg: "Team registered"});
          else {
              console.log("success", info);
              res.status(200).json({error: {status: false, errorInfo: null},msg: "Team registered"})
          }
      }
  );
});
router.post('/login', authController.login);
router.post('/verifyToken', authController.verifyToken);

//protected routes
router.post('/protectedDashboard', passport.authenticate('jwt', {session:false}), dashboardController.registerTeam);
module.exports = router;

//custom middleware
function authenticate(req, res, next) {
  let token = (req.headers.authorization).split(' ')[1];
  verifyToken(token, function(response) {
    if(response) {
      next();
    } else {
      res.status(401).json({error: {
        status: true,
        errorInfo: "Unauthorized"
      }});
    }
  })

}