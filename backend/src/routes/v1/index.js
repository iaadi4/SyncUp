import express from 'express';
import userController from '../../controllers/user-controller.js';

const router = express.Router();
const { signup } = userController;

router.post (
    '/signup',
    signup
);

export default router;
