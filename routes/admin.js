const router = require('express').Router();
const homeController = require('../controllers/home');

router.post('/createPhase', homeController.createPhase);
router.post('/setThisAsCurrentPhase', homeController.setThisPhaseAsCurrent);
router.post('/createImportantDates', homeController.createImportantDates);

module.exports = router;