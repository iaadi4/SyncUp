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
            const response = await models.Conversation.findByIdAndDelete(conversationId);
            return response;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

export default ConversationRepository;