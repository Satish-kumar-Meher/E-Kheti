import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


// for chatting
export const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {textMessage:message,isRead} = req.body;
      
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });
        // establish the conversation if not started yet.
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            isRead,
            message
        });
        if(newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(),newMessage.save()])

        // implement socket io for real time data transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}
export const getMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}
        }).populate('messages');
        if(!conversation) return res.status(200).json({success:true, messages:[]});

        return res.status(200).json({success:true, messages:conversation?.messages});
        
    } catch (error) {
        console.log(error);
    }
}

// Delete all chat between two users
export const deleteAllMessages = async (req, res) => {
    try {
        const senderId = req.id; // Logged-in user ID
        const receiverId = req.params.id; // Receiver's ID

        // Find the conversation between the two users
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            return res.status(404).json({ success: false, message: 'No conversation found between these users' });
        }

        // Delete all messages associated with this conversation
        await Message.deleteMany({ _id: { $in: conversation.messages } });

        // Delete the conversation itself
        await Conversation.findByIdAndDelete(conversation._id);

        return res.status(200).json({ success: true, message: 'All chats between the users have been deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error deleting chat' });
    }
};