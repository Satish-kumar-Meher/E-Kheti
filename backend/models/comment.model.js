import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Please add a comment'],

  },
  likes : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  replies : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Comment =  mongoose.model('Comment', commentSchema);


