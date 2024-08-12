import express from 'express';
import controllers from '../../controllers/index.js';

const router = express.Router();
const { signup, login } = controllers.UserController;

router.post (
    '/signup',
    signup
);

router.post (
    '/login',
    login
)

export default router;
