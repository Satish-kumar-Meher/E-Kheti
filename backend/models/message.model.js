
// const mongoose = require("mongoose")
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
      },
    createdAt: {
        type: Date,
        default: Date.now,
      }
});

export const Message = mongoose.model('Message', messageSchema);

