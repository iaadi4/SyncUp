import MessageService from "../services/message-service.js";

const messageService = new MessageService();

const sendMessage = async(req, res) => {
    try {
        const newMessage = await messageService.sendMessage(req.user.id, req.params.id, req.body.message);
        return res.status(201).json({
            data: newMessage,
            success: true,
            message: 'message send successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

export default {
    sendMessage
}