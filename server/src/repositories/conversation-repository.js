import models from "../models/index.js";

class ConversationRepository {

    async get(senderId, receiverId) {
        try {
            const conversation = await models.Conversation.findOne({
                participants: {$all: [senderId, receiverId]}
            });
            return conversation;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async getWithMessage(senderId, receiverId) {
        try {
            const conversation = await models.Conversation.findOne({
                participants: {$all: [senderId, receiverId]}
            }).populate('messages');
            return conversation;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async create(senderId, receiverId) {
        try {
            const conversation = await models.Conversation.create({
                participants: [senderId, receiverId]
            });
            return conversation;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async destroy(conversationId) {
        try {
            const conversation = await models.Conversation.findById(conversationId);
            if(conversation) {
                const messages = conversation.messages;
                if(messages) {
                    messages.forEach(async (id) => {
                        const message = id.toString();
                        await models.Message.findByIdAndDelete(message);
                    })
                }
                await models.Conversation.findByIdAndDelete(conversationId);
                return true;
            }
            throw new Error('Conversation not found');
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

export default ConversationRepository;