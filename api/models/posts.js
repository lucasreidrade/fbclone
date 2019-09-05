var mongoose = require( 'mongoose' );

//Getting ObjectId type
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  image: { data: Buffer, contentType: String },
  text: String,
  creation: {
    type: Date,
    index: true,
    required: true,
    default: Date.now 
  },
  comments: [{ text: String, date: Date, commenterId: ObjectId}],
});

postSchema.methods.addPost = function(){

};

mongoose.model('Post', postSchema);
