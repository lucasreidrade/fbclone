
/* GET home page. */
module.exports.index = function(req,res,next){
  res.render('index', { title: 'My App' });
} 

module.exports.profile = function(req,res,next){
  res.render('profile', { title: 'My App' });
} 

module.exports.profile_edit = function(req,res,next){
  res.render('profile_edit', { title: 'My App' });
} 

module.exports.result = function(req,res,next){
  res.render('result', { title: 'My App' });
} 
