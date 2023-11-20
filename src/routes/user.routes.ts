import express from 'express';
import { userController } from '../controller/user.controller';

const router = express.Router();

router.post('/users', (req, res) => userController.createNewUser(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.get('/users/email/:email', (req, res) => userController.getUserByEmail(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

export default router;
