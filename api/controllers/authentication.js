var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

const sendJSONresponse =  require('./api_functions').sendJSONResponse;
var passport = require('passport');

var genToken = function(err, user, info){
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token" : token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  }

module.exports.register = function(req, res) {

  console.log("req.body");
  console.log(req.body);

  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  
      sendJSONresponse(res, 200, {
        "token" : token
      });
    return;
    //TODO
  user.save(function(err) {
    genToken(err,user,"User should not be null.");
  });

};

module.exports.login = function(req, res) {
  console.log(req);
  return;
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', genToken)(req, res);

};