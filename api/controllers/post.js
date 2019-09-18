const mongoose = require('mongoose');
const posts = mongoose.model('Post');

const sendJSONresponse = require('../api_functions').sendJSONResponse;

//TODO: controller for posts

module.exports.postCreate = function (req, res) {
  if (!req.body.userId) {
    sendJSONresponse(res, 400, {
      "message": "Post Creation not possible.",
      "err": "missing userId"
    });

    var post = new Post();
    post.userId = req.body.userId;
    post.image = req.body.image;
    post.creation = Date.now();
    post.userId = req.body.userId;

    post.save().then(result => {
      sendJSONresponse(res, 200, {
        "message": "Post Created.",
        "result": result
      });
    }).catch(err => {
      sendJSONresponse(res, 400, {
        "message": "Post Creation not possible.",
        "err": err
      });
    });

  }
}

module.exports.postList = function (req, res) {

  if (!req.body.query) {
    sendJSONresponse(res, 400, {
      "message": "Post listing not possible.",
      "err": "missing querry"
    });

    posts.find(req.body.query).then(result => {
      sendJSONresponse(res, 200, {
        "message": "Posts found.",
        "result": result
      });
    }).catch(err => {
      sendJSONresponse(res, 400, {
        "message": "Post query not possible.",
        "err": err
      });
    });
  }
}

module.exports.postUpdate = function (req, res) {
  if (!req.body.query || !req.body.update) {
    sendJSONresponse(res, 400, {
      "message": "Post listing not possible.",
      "err": "missing querry and/or update"
    });

    posts.update(req.body.query, req.body.update).then(result => {
      sendJSONresponse(res, 200, {
        "message": "Posts found.",
        "result": result
      });
    }).catch(err => {
      sendJSONresponse(res, 400, {
        "message": "Post update not possible.",
        "err": err
      });
    });
  }
}

module.exports.postDelete = function (req, res) {
  if (!req.body.query) {
    sendJSONresponse(res, 400, {
      "message": "Post listing not possible.",
      "err": "missing querry"
    });

    posts.deleteMany(req.body.query).then(result => {
      sendJSONresponse(res, 200, {
        "message": "Posts found.",
        "result": result
      });
    }).catch(err => {
      sendJSONresponse(res, 400, {
        "message": "Post query not possible.",
        "err": err
      });
    });
  }
}