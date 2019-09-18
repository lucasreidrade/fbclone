var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//Getting ObjectId type
const ObjectId = mongoose.Schema.Types.ObjectId;

//Security constants
const iterations = 500; //More iterations = more secure but slower
const hLen = 64;        //Hash output size of pbkdf2Sync
const digest = "sha1";  //Hash digest algorithm

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  name: {
    type: String,
    index: true,
    required: true
  },
  creation: {
    type: Date,
    index: true,
    required: true,
    default: Date.now 
  },
  hash: String,
  salt: String,
  image: { data: String },
  bio: String,
  following: [{userId: ObjectId}],
  followers: [{userId: ObjectId}],
  posts: [{postId: ObjectId}],
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  //doing sha1 hashing with salt to store hashed password
  this.hash = crypto.pbkdf2Sync(password, this.salt, iterations, hLen,digest).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  //doing sha1 hashing with salt to check hashed password
  var hash = crypto.pbkdf2Sync(password, this.salt, iterations, hLen,digest).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    id: this._id,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);


