import mongoose from "mongoose";



const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    chats : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }]
})

export const Conversation = mongoose.model('Conversation', conversationSchema);

