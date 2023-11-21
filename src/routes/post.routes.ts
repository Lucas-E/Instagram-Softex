import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { postController } from "../controller/post.controller";
import { UserRequest } from "../interfaces/UserRequest";

const postRouter = Router();

postRouter.post('/create', authMiddleware, (req, res) => postController.createPost(req as UserRequest, res));
postRouter.put('/:id/update', authMiddleware,(req, res) => postController.updatePost(req as UserRequest, res));
postRouter.delete('/:id/delete', authMiddleware,(req, res) => postController.deletePost(req as UserRequest, res));

export default postRouter;