import mongoose from "mongoose";


const replySchema = new mongoose.Schema({
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
  comment : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required : true,
  },
  text: {
    type: String,
    required: [true, 'Please add a reply'],

  },
  likes : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Reply = mongoose.model('Reply', replySchema);
