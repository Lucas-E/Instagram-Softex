import { Router } from "express";
import { commentController } from "../controller/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRequest } from "../interfaces/UserRequest";

const commentRouter = Router();

commentRouter.post('/:postId/create',authMiddleware, (req,res) => commentController.createComment(req as UserRequest,res));
commentRouter.get('/:postId', authMiddleware, (req, res) => commentController.getCommentsByPost(req as UserRequest, res));
commentRouter.put('/:commentId/update', authMiddleware, (req, res) => commentController.updateComment(req as UserRequest, res));
commentRouter.delete('/:commentId/delete', authMiddleware, (req, res) => commentController.deleteComment(req as UserRequest, res));

export default commentRouter;
