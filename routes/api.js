const express = require('express');
const registerController = require('../controllers/register');
const router = express.Router();

router.post('/v2/register', registerController.register);
router.post('/test', registerController.file);
router.get('/test', registerController.test);

module.exports = router;