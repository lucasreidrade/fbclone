var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

const sendJSONresponse = require('../api_functions').sendJSONResponse;

module.exports.register = function (req, res) {

  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save().then(() => {
    var token = user.generateJwt();
    sendJSONresponse(res, 200, {
      "token": token
    });
  }).catch(e => {
    sendJSONresponse(res, 500, { "error": e });
  });

};


module.exports.login = function (req, res) {
  if(!req.body.email || !req.body.password) {
    return sendJSONresponse(res, 400, {
      "message": "Email and Password fields required."
    });
  }
  
  var passport_auth_callback = function (err, user, info) {
    if (err) {
      return sendJSONresponse(res, 500, { "error": err });
    }
    if (info) {
      return sendJSONresponse(res, info.code, { "message": info.message });
    }
    if (!user) {
      return sendJSONresponse(res, 500, { "message": "User not found." });
    }
    var token = user.generateJwt();
    sendJSONresponse(res, 200, { "token": token });
  };


  passport.authenticate('local', passport_auth_callback)(req, res);


};
