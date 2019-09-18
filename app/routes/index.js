var express = require('express');
const router = express.Router();

var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/profile', ctrlMain.profile);
router.get('/profile/edit', ctrlMain.profile_edit);
router.get('/result', ctrlMain.result);

module.exports = router;
