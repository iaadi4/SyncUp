import MessageService from "../services/message-service.js";

const messageService = new MessageService();

const sendMessage = async(req, res) => {
    try {
        const newMessage = await messageService.sendMessage(req.user.id, req.params.id, req.body.message);
        return res.status(201).json({
            data: newMessage,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

const getMessages = async(req, res) => {
    try {
        const messages = await messageService.getMessages(req.user.id, req.params.id);
        return res.status(201).json({
            data: messages,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

export default {
    sendMessage,
    getMessages
}