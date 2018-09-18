const express = require('express');
const authController = require('../controllers/auth');
const dashboardController = require('../controllers/dashboard');
const homeController = require('../controllers/home');
let config = require('../config');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const verifyToken = require('../controllers/auth').verifyTokenUtil; 
const middleware = require('../middlewares/verifyCaptcha');
const multer = require('multer');
const upload = multer({
    dest: '../files'
})
//auth routes
router.post('/signUp',middleware.verifyCaptcha ,authController.signUp);
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
router.post('/dashboard', passport.authenticate('jwt', {session:false}), dashboardController.registerTeam);
router.get('/dashboard/getAllDetails', passport.authenticate('jwt', {session: false}), dashboardController.getAllDetail);
router.post('/upload', dashboardController.uploadFile);
router.post('/uploadFile',[passport.authenticate('jwt', {session:false}), upload.single('file')], dashboardController.uploadFile);
router.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname, '/upload.html'));});
router.get('/download', dashboardController.downloadFile);


//admin routes
router.post('/adminLogin', authController.adminLogin);
router.get('/admin/getImportantdates', homeController.getImportantDates);
router.get('/admin/getCurrentPhase', homeController.getCurrentPhase);
router.get('/admin/getAllTeams', homeController.getAllTeams);
router.get('/admin/getTeamDetails', homeController.getTeamDetails);


module.exports = router;
