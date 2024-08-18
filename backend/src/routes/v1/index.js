import express from 'express';
import controllers from '../../controllers/index.js';
import auth from '../../middlewares/authentication.js';

const router = express.Router();
const { signup, login } = controllers.UserController;
const { sendMessage, getMessages } = controllers.MessageController;

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

router.get(
    '/messages/:id',
    auth,
    getMessages
)

export default router;
