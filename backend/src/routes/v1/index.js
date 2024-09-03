import express from 'express';
import controllers from '../../controllers/index.js';
import auth from '../../middlewares/authentication.js';

const router = express.Router();
const { signup, login, getAll, addFriend, getFriends } = controllers.UserController;
const { sendMessage, getMessages } = controllers.MessageController;
const { deleteConversation, getConversation } = controllers.ConversationController;

router.post (
    '/signup',
    signup
);

router.post (
    '/login',
    login
)

router.post(
    '/message/send/:id',
    auth,
    sendMessage
)

router.post(
    '/addFriend/:friendId',
    auth,
    addFriend
)

router.get(
    '/friends',
    auth,
    getFriends
)

router.get(
    '/messages/:id',
    auth,
    getMessages
)

router.get(
    '/users',
    auth,
    getAll
)

router.delete(
    '/delete/:id',
    auth,
    deleteConversation
)

router.get(
    '/conversation/:senderId/:receiverId',
    auth,
    getConversation
)

export default router;
