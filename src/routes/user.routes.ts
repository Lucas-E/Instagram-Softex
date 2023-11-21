import express from 'express';
import { userController } from '../controller/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserRequest } from '../interfaces/UserRequest';

const router = express.Router();

router.post('/users',(req, res) => userController.createNewUser(req, res));
router.get('/users/:id',authMiddleware, (req, res) => userController.getUserById(req, res));
router.get('/users/email/:email', authMiddleware,(req, res) => userController.getUserByEmail(req, res));
router.put('/users/:id', authMiddleware,(req, res) => userController.updateUser(req as UserRequest, res));
router.delete('/users/:id', authMiddleware,(req, res) => userController.deleteUser(req as UserRequest, res));

export default router;
