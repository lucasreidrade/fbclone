const mongoose = require('mongoose');
const users = mongoose.model('User');
const posts = mongoose.model('Post');

const sendJSONresponse =  require('./api_functions').sendJSONResponse;

//TODO: controller for posts

module.exports.postCreate = function(req, res) {
}

module.exports.postRead = function(req, res) {
}

module.exports.postList = function(req, res) {
}

module.exports.postUpdate = function(req, res) {
}

module.exports.postDelete = function(req, res) {
}