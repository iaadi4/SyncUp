import models from '../models/index.js';

class ConversationService {

    async updateSeen(conversationId) {
        try {
            const conversation = await models.Conversation.findById(conversationId);
            if(conversation) {
                const response = await models.Message.updateMany(
                    { 
                        _id: { $in: conversation.messages },
                        status: 'sent'
                    },  
                    { $set: { status: 'seen' } }              
                )
                return response;
            }
            throw new Error('Conversation not found');
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw Error;
        }
    }
}

export default ConversationService;