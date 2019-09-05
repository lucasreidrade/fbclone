var express = require('express');
const router = express.Router();

const ctrlAuth = require('../controllers/authentication');
const ctrlPrfl = require('../controllers/profile');
const ctrlPost = require('../controllers/post');

//TODO: Create Routes


router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
