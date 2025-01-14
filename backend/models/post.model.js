import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, 'Please add a caption for the post'],
  },
  image: {
    type: String,
    required: [true, 'Please add an image for the post'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location : {
    type: String,

  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Post =  mongoose.model('Post', postSchema);


