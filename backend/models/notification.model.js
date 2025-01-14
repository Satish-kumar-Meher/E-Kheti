import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  reciver : { // The user who receives the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: { // The user who triggered the notification (optional)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  link: { // Link to the relevant post, product, etc.
    type: String,
  },
  type: {
    type: String, 
    enum: ['like', 'comment','dislike', 'follow', 'message', 'purchase', 'general','alert'],
    default: 'general',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Notification =  mongoose.model('Notification', notificationSchema);
