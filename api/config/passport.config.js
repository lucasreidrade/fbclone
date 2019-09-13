var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function (email, password, done) {
    User.findOne({ email: email }).then(user => {
      if (!user) {
        return done(null, false, {
          code: 401,
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          code: 401,
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    }).catch(err => {
      return done(err);
    });
  }));