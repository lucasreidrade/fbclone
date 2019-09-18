var express = require('express');
const router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

const ctrlUser = require('../controllers/user');
//TODO:const ctrlPost = require('../controllers/post');

//TODO: Create Routes


router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);

router.post('/getUserById', ctrlUser.getUserById);
router.post('/updateUser',auth, ctrlUser.updateUser);


module.exports = router;
