import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

class MessageService {

    async sendMessage(senderId, receiverId, message) {
        try {
            let conversation = await Conversation.findOne({
                participants: {$all: [senderId, receiverId]}
            });

            if(!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId]
                });
            }

            const newMessage = await Message.create({
                senderId,
                receiverId,
                message
            });

            if(newMessage) {
                conversation.messages.push(newMessage._id);
            }

            await Promise.all([conversation.save(), newMessage.save()]);

            return newMessage;
        } catch (error) {
            throw error;
        }
    }

    async getMessages(senderId, receiverId) {
        try {
            const conversation = await Conversation.findOne({
                participants: {$all: [senderId, receiverId]}
            }).populate("messages");
            if(!conversation)
                return [];
            return conversation.messages;
        } catch (error) {
            throw error;
        }
    }
}

export default MessageService;