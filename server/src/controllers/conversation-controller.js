import ConversationRepository from "../repositories/conversation-repository.js";
import ConversationService from "../services/conversation-service.js";

const conversationRepository = new ConversationRepository();
const conversationService = new ConversationService();

const deleteConversation = async(req, res) => {
    try {
        const response = await conversationRepository.destroy(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

const getConversation = async(req, res) => {
    try {
        const id = await conversationRepository.get(req.params.senderId, req.params.receiverId);
        return res.status(200).json({
            data: id,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

const getWithMessages = async(req, res) => {
    try {
        const messages = await conversationRepository.getWithMessage(req.params.senderId, req.params.receiverId);
        return res.status(200).json({
            data: messages,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

const updateSeen = async(req, res) => {
    try {
        const response = await conversationService.updateSeen(req.params.id);
        return res.status(200).json({
            data: response,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

export default {
    deleteConversation,
    getConversation,
    getWithMessages,
    updateSeen
}