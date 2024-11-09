import repositories from "../repositories/index.js";
import Message from "../models/message.js";
import getReceiverSocketId from "../socket/socket.js";
import {io} from "../socket/socket.js";

const conversationRepository = new repositories.ConversationRepository();

class MessageService {

    async sendMessage(senderId, receiverId, message, status) {
        try {
            let conversation = await conversationRepository.get(senderId, receiverId);

            if(!conversation) {
                conversation = await conversationRepository.create(senderId, receiverId);
            }

            const newMessage = await Message.create({
                senderId,
                receiverId,
                message,
                status
            });

            if(newMessage) {
                conversation.messages.push(newMessage._id);
            }

            await Promise.all([conversation.save(), newMessage.save()]);

            const receiverSocketId = getReceiverSocketId(receiverId);
            if(receiverSocketId) {
                io.to(receiverSocketId).emit('newMessage', newMessage);
            }

            return newMessage;
        } catch (error) {
            throw error;
        }
    }

    async getMessages(senderId, receiverId) {
        try {
            const conversation = await conversationRepository.getWithMessage(senderId, receiverId);
            if(!conversation)
                return [];
            return conversation.messages;
        } catch (error) {
            throw error;
        }
    }
}

export default MessageService;