import express from 'express';
import controllers from '../../controllers/index.js';
import auth from '../../middlewares/authentication.js';

const router = express.Router();
const { signup, login, getAll, favourite, getFavourite, updateUser, getUser } = controllers.UserController;
const { addFriend, getFriends, removeFriend } = controllers.FriendController;
const { sendMessage, getMessages } = controllers.MessageController;
const { deleteConversation, getConversation, getWithMessages, updateSeen } = controllers.ConversationController;

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
    '/addFriend/:friendEmail',
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

router.patch(
    '/removeFriend/:friendId',
    auth,
    removeFriend
)

router.get(
    '/conversation/:senderId/:receiverId',
    auth,
    getConversation
)

router.get(
    '/conversation/messages/:senderId/:receiverId',
    auth,
    getWithMessages
)

router.post(
    '/favourite/:contactId',
    auth, 
    favourite
)

router.get(
    '/favourite/get',
    auth,
    getFavourite
)

router.get(
    '/user',
    auth,
    getUser
)

router.patch(
    '/user/update',
    auth,
    updateUser
)

router.patch(
    '/conversation/updateSeen/:id',
    auth,
    updateSeen
)

export default router;
